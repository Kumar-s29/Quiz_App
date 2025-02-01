import React from "react";
import PropTypes from "prop-types";
import { Timer, Activity } from "lucide-react";

// Define the Quiz component

const Quiz = ({ question, gameState, onAnswer, totalQuestions = 5 }) => {
  if (!question) return <p className="text-center text-gray-600">Loading...</p>;

  // Calculate the progress percentage
  const progress = ((gameState.currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Progress and Timer */}
      <div className="flex justify-between items-center">
        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-gray-600" />
          <span className="font-mono text-lg">{gameState.timeRemaining}s</span>
        </div>
      </div>

      {/* Streak Indicator */}
      {gameState.streak > 1 && (
        <div className="flex items-center justify-center space-x-2 text-orange-500 animate-bounce">
          <Activity className="w-5 h-5" />
          <span className="font-semibold">{gameState.streak} Streak!</span>
        </div>
      )}

      {/* Question */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-8">
          {question ? question.description : "Loading..."}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {question?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-purple-500
                       transition-all duration-200 hover:shadow-md focus:outline-none
                       focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              {option.description}
            </button>
          ))}
        </div>
      </div>

      {/* Question Counter */}
      <div className="text-center text-gray-600">
        Question {gameState.currentQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};

// Define the prop types for the Quiz component
Quiz.propTypes = {
  question: PropTypes.object,
  gameState: PropTypes.shape({
    currentQuestion: PropTypes.number.isRequired,
    timeRemaining: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  totalQuestions: PropTypes.number,
};

export default Quiz;
