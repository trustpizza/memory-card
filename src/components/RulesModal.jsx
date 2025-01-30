import { useState, useEffect } from "react";

function RulesModal() {
  const [showRules, setShowRules] = useState(true);

  return (
    showRules && (
      <dialog open className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center">📜 Game Rules 📜</h3>
          <p className="py-4 text-center">
            Click on each image <span className="font-bold">**only once**</span>.  
            <br />
            If you click the same image twice, you <span className="font-bold">**lose**</span>!  
            <br />
            <br />
            Try to remember the images you’ve clicked and score <span className="underline">as high as possible!</span>
          </p>
          <p className="py-4 text-center">
            Difficulty: You can change your difficulty to Easy, Medium, and Hard
            <br />
            Version: You can also change the images you select between Pokemon and Kitten Gifs
          </p>
          <div className="modal-action">
            <button onClick={() => setShowRules(false)} className="btn btn-primary mx-auto">
              Got It!
            </button>
          </div>
        </div>
      </dialog>
    )
  );
}

export default RulesModal;
