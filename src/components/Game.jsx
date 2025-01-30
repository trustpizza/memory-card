import { useState, useEffect } from "react";

import Card from "./Card";
import Selector from "./Selector";
import shuffleArray from "../helpers/shuffleArray";
import RulesModal from "./RulesModal";

// Game Versions
const gameVersions = {
  "Pokemon": "poke",
  "Kittens": "gif",
}
// Difficulty Versions
const difficultyVersions = {
  "Easy": 8,
  "Medium": 12,
  "Hard": 24
}

// API Configurations
const poke_url = "https://pokeapi.co/api/v2/pokemon/";
const giffy_url = "https://api.giphy.com/v1/gifs/search";
const api_key = import.meta.env.VITE_GIFFY_API_KEY;

// Giffy Query Data
const queries = ["kitten"]; // You can always add extra query types
const rating = "g";
const lang = "en";

function Game() {
  const [images, setImages] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [version, setVersion] = useState(gameVersions["Pokemon"]);
  // Search Limit
  const [limit, setLimit] = useState(difficultyVersions["Easy"]);
  const [gameOver, setGameOver] = useState(false);

  const handleImageClick = (key) => {
    if (gameOver) {
      // Reset game on click after winning
      endGame();
      return;
    }
    
    if (!selectedImages.includes(key)) {
      const newSelectedImages = [...selectedImages, key];
      setSelectedImages(newSelectedImages);
      setScore(score + 1);
  
      if (newSelectedImages.length === images.length) {
        // Player wins
        setGameOver(true);
      }
    } else {
      // Player loses
      setGameOver(true);
    }
    shuffleArray(images);
  };
  

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
    endGame();
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    endGame();
  }

  const endGame = () => {
    setGameOver(false);
    setScore(0);
    setHighScore(highScore >= score ? highScore : score);
    setSelectedImages([]);
  };

	useEffect(() => {
    setImages([]);
    const randomElement = queries[Math.floor(Math.random() * queries.length)];
    if (version === "gif") {
      const req_url = `${giffy_url}?api_key=${api_key}&q=${randomElement}&limit=${limit}&rating=${rating}&lang=${lang}`; 
      fetch(req_url, { mode: "cors" })
        .then((response) => response.json())
        .then((response => {
          const imageObjs = response.data.map((gif) => ({
            id: gif.id,
            url: gif.images.original.url
          }))
          setImages(imageObjs)
        }))
    } else if (version === "poke") {
      const tempImages = [];
      const uniqueIds = new Set();
    
      while (uniqueIds.size < limit) {
        uniqueIds.add(Math.floor(Math.random() * 151) + 1);
      }
    
      const requests = Array.from(uniqueIds).map((id) => {
        return fetch(`${poke_url}${id}`) // ✅ Return the fetch promise
          .then((response) => response.json())
          .then((data) => {
            tempImages.push({
              id: data.id,
              url: data.sprites.front_default
            });
          })
          .catch((error) => console.error(`Error fetching Pokémon ${id}:`, error));
      });
      Promise.all(requests).then(() => {
        setImages([...tempImages]);
      });
    }
	}, [version, limit, gameOver])

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-12">
      <RulesModal /> {/* Show rules when page loads */}
      {/* Header */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl text-center mb-4">
        <h1 className="text-3xl font-bold text-primary">Memory Game</h1>
      </div>

      {/* Version Selector */}
      <Selector
        handleChange={handleVersionChange}
        type={version}
        choices={gameVersions}
        name="version"
      />

      {/* Difficulty Selector */}
      <Selector
        handleChange={handleLimitChange}
        type={limit}
        choices={difficultyVersions}
        name="difficulty"
      />

      {/* Score Section */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl flex justify-between bg-base-100 p-4 rounded-lg shadow-md mb-4">
        <div className="text-lg font-semibold">
          Score: <span className="text-primary">{score}</span>
        </div>
        <div className="text-lg font-semibold">
          High Score: <span className="text-secondary">{highScore >= score ? highScore : score}</span>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 w-full max-w-lg md:max-w-2xl lg:max-w-4xl bg-base-100 p-4 rounded-lg shadow-md">
        {images.length > 0 ? (
          images.map((image) => (
            <Card
              key={image.id}
              imageUrl={image.url}
              onClick={() => handleImageClick(image.id)}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
      {/* DaisyUI Modal for Game Over */}
      {gameOver && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-center">
              {selectedImages.length === images.length ? "🎉 You Win! 🎉" : "❌ Game Over! ❌"}
            </h3>
            <p className="py-4 text-center">
              {selectedImages.length === images.length
                ? "Great job! You found all the matches!"
                : "Oops! You clicked the same image twice. Try again!"}
            </p>
            <div className="modal-action">
              <button onClick={endGame} className="btn btn-primary mx-auto">
                Play Again
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Game;