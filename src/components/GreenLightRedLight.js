import React, { useState, useEffect } from "react";
import "./GreenLightRedLight.css";

const GreenLightRedLight = ({ difficulty }) => {
  const [isGreen, setIsGreen] = useState(false);
  const [colorChangeInterval, setColorChangeInterval] = useState(null);
  const [score, setScore] = useState(0); // Initialize the score
  const [gameOutcome, setGameOutcome] = useState("playing"); // 'playing', 'won', or 'lost'
  const [remainingTime, setRemainingTime] = useState(
    difficulty === "easy" ? 40 : difficulty === "medium" ? 40 : 40
  );
  const targetClicks =
    difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 25;
  const timeLimit = 40; // 40 seconds for all difficulty levels

  useEffect(() => {
    const randomInterval = Math.floor(Math.random() * 1000) + 1000;

    const intervalId = setInterval(() => {
      setIsGreen((prev) => !prev);
    }, randomInterval);

    setColorChangeInterval(intervalId);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(colorChangeInterval);
    };
  }, []);

  const handleBoxClick = () => {
    if (isGreen) {
      setScore(score + 1); // Increment the score when the user clicks the green box
      setIsGreen(false); // Reset the color
    } else {
      // User clicked on the red box
      clearInterval(colorChangeInterval); // Stop color changes
      setGameOutcome("lost"); // Update game outcome to 'lost'
    }
  };

  useEffect(() => {
    if (score >= targetClicks) {
      // User reached the target score
      clearInterval(colorChangeInterval); // Stop color changes
      setGameOutcome("won"); // Update game outcome to 'won'
    }
  }, [score, targetClicks]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      if (remainingTime > 0 && gameOutcome === "playing") {
        setRemainingTime(remainingTime - 1);
      } else if (remainingTime === 0) {
        clearInterval(timer); // Stop the timer when time runs out
        setGameOutcome("lost"); // Update game outcome to 'lost'
      }
    }, 1000);

    return () => {
      clearInterval(timer); // Clean up the timer
    };
  }, [remainingTime, gameOutcome]);

  return (
    <div className="game-container">
      {gameOutcome === "won" ? (
        <div className="win-message">You Win!</div>
      ) : gameOutcome === "lost" ? (
        <div className="game-over-message">Game Over!</div>
      ) : (
        <>
          <div
            className={`color-box ${isGreen ? "green" : "red"}`}
            onClick={handleBoxClick}
          ></div>
          <p>Time Left: {remainingTime} seconds</p>
          <p>Score: {score}</p>
        </>
      )}
    </div>
  );
};

export default GreenLightRedLight;
