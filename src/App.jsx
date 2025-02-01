import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

// The URL of the API endpoint to fetch questions.
const API_URL =
  "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX";

// Initial state for the game, including current question, score, streak, time remaining, and answers.
const initialGameState = {
  currentQuestion: 0,
  score: 0,
  streak: 0,
  timeRemaining: 30,
  answers: [],
};

export default function App() {
  // State variables
  const [questions, setQuestions] = useState([]); // Stores questions fetched from the API
  const [gameState, setGameState] = useState(initialGameState); // Stores the current state of the game
  const [gameStage, setGameStage] = useState("start"); // Represents the current stage of the game ("start", "quiz", "results")
  const [highScores, setHighScores] = useState([]); // Stores the high scores
  const [loading, setLoading] = useState(false); // Tracks loading state while fetching questions
  const [error, setError] = useState(null); // Stores any error that occurs during fetching

  // Function to fetch questions from the API and randomize them
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch questions.");
      const data = await response.json();
      // Randomize questions to make the quiz dynamic
      const randomizedQuestions = data.questions.sort(
        () => Math.random() - 0.5
      );

      // Set randomized questions
      setQuestions(
        Array.isArray(randomizedQuestions) ? randomizedQuestions : []
      );
    } catch (err) {
      setError(err.message); // Capture error message
    }
    setLoading(false);
  };

  // Fetch questions only when the game starts and if questions are empty
  useEffect(() => {
    if (gameStage === "quiz" && questions.length === 0) {
      fetchQuestions();
    }
  }, [gameStage, questions.length]);

  // Timer function that updates the time remaining every second
  useEffect(() => {
    if (gameState.timeRemaining > 0 && gameStage === "quiz") {
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [gameState.timeRemaining, gameStage]);

  // Function to start the game
  const startGame = () => {
    setGameState(initialGameState); // Reset game state
    setGameStage("quiz"); // Move to quiz stage
  };

  // Function to handle an answer selection
  const handleAnswer = (answerIndex) => {
    const currentQuestion = questions[gameState.currentQuestion];
    const selectedOption = currentQuestion.options[answerIndex]; // Get the selected option based on index

    const isCorrect = selectedOption.is_correct; // Check if the selected option is correct

    // Calculate new score and streak
    const newScore = isCorrect ? gameState.score + 100 : gameState.score;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;

    // Update game state
    setGameState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1, // Move to the next question
      score: newScore,
      streak: newStreak,
      answers: [...prev.answers, answerIndex],
    }));

    // If it's the last question, display the results
    if (gameState.currentQuestion + 1 === questions.length) {
      setTimeout(() => {
        setHighScores((prev) => [
          ...prev,
          { score: newScore, date: new Date() },
        ]);
        setGameStage("results"); // Transition to results stage
      }, 500);
    }
  };

  // Function to restart the game
  const restartGame = () => {
    setGameState(initialGameState); // Reset game state
    setGameStage("start"); // Go back to start screen
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        {/* Render start screen */}
        {gameStage === "start" && <StartScreen onStart={startGame} />}

        {/* Render quiz screen */}
        {gameStage === "quiz" && (
          <>
            {loading ? (
              <p className="text-center text-gray-600">Loading questions...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <Quiz
                question={questions[gameState.currentQuestion]}
                gameState={gameState}
                onAnswer={handleAnswer}
                totalQuestions={questions.length}
              />
            )}
          </>
        )}

        {/* Render results screen */}
        {gameStage === "results" && (
          <Results
            gameState={gameState}
            onRestart={restartGame}
            highScores={highScores}
            questions={questions}
            totalQuestions={questions.length || 1}
          />
        )}
      </div>
    </div>
  );
}
