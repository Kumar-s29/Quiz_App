import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Trophy, Award, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

// Define the Results component
const Results = ({ gameState, onRestart, highScores, questions }) => {
  useEffect(() => {
    if (gameState.score > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [gameState.score]);

  // Ensure `questions` is passed to avoid errors
  const correctAnswers = gameState.answers.filter(
    (answer, index) => answer === questions[index]?.correctAnswer
  ).length;

  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        {gameState.score >= 400 ? (
          <Trophy className="w-20 h-20 text-yellow-500" />
        ) : (
          <Award className="w-20 h-20 text-purple-500" />
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Quiz Complete!</h2>
        <p className="text-gray-600">
          You got {correctAnswers} out of {questions.length} questions correct
        </p>
        <p className="text-2xl font-semibold text-purple-600">
          Score: {gameState.score}
        </p>
        {gameState.streak > 2 && (
          <p className="text-orange-500">Max Streak: {gameState.streak}!</p>
        )}
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center space-x-2 mx-auto px-6 py-3
                 bg-purple-600 text-white rounded-lg hover:bg-purple-700
                 transition-colors duration-200"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Play Again</span>
      </button>

      {highScores.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">High Scores</h3>
          <div className="space-y-2">
            {highScores.slice(0, 3).map((score, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
              >
                <span className="text-gray-600">
                  {new Date(score.date).toLocaleDateString()}
                </span>
                <span className="font-semibold text-purple-600">
                  {score.score} points
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Define prop types for the Results component
Results.propTypes = {
  gameState: PropTypes.shape({
    score: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    streak: PropTypes.number.isRequired,
  }).isRequired,
  onRestart: PropTypes.func.isRequired,
  highScores: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Results;
