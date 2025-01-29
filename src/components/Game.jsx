import { useState, useEffect } from "react";
import Card from "./Card";
import Selector from "./Selector";

// Game Versions
const gameVersions = {
  "Pokemon": "poke",
  "Gif": "gif",
}

// API Configurations
const poke_url = "https://pokeapi.co/api/v2/pokemon/";
const giffy_url = "https://api.giphy.com/v1/gifs/search";
const api_key = import.meta.env.VITE_GIFFY_API_KEY;

// Search Limit
const limit = 5;

// Giffy Query Data
const queries = ["puppy", "kitten"];
const rating = "g";
const lang = "en";

function Game() {
  const [images, setImages] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [version, setVersion] = useState(gameVersions["Pokemon"]);

  const handleImageClick = (key) => {
    if (!selectedImages.includes(key)) {
      setScore(score + 1);
      setSelectedImages([...selectedImages, key]);
    } else {
      endGame();
    }
  };

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
    endGame();
  }

  const endGame = () => {
    alert("Game Over! Your score: " + score);
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
        console.log("Fetched Pokémon:", tempImages);
      });
    }
	}, [version])

  return (
		<>
		<div>
      <Selector
        handleChange={handleVersionChange}
        version={version}
        choices={gameVersions}
        name="version"
      >

      </Selector>
			<ul>
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
			</ul>
			<div>
				Score: {score}
				High Score: {highScore >= score ? highScore : score}
			</div>
		</div>
		</>
	)
}

export default Game;