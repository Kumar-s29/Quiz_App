import React from "react";
import { Brain, Trophy } from "lucide-react"; // Importing icons for visual appeal

const StartScreen = ({ onStart, highScores }) => {
  return (
    <div className="text-center space-y-8">
      {" "}
      {/* Main container for the start screen, center aligned with spacing */}
      {/* Header Section */}
      <div className="flex justify-center items-center space-x-4">
        {/* Flexbox layout to center the items horizontally with space between them */}
        <Brain className="w-12 h-12 text-purple-600" />{" "}
        {/* Brain icon with specific width, height, and color */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Brain Quest
        </h1>{" "}
        {/* Title with a gradient color effect */}
      </div>
      <p className="text-gray-600 text-lg">
        Test your knowledge and earn rewards!
      </p>{" "}
      {/* Subtitle text explaining the game */}
      {/* Start Quiz Button */}
      <button
        onClick={onStart} // Trigger the onStart function passed as a prop when clicked
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg
                 text-xl font-semibold transform transition-all hover:scale-105 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        // Styled button with hover and focus effects
      >
        Start Quiz
      </button>{" "}
      {/* Button to start the quiz */}
      {/* High Scores Section */}
      <div className="mt-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {/* Flexbox layout for high scores header with a trophy icon */}
          <Trophy className="w-5 h-5 text-yellow-500" />{" "}
          {/* Trophy icon for high scores */}
          <h2 className="text-xl font-semibold">High Scores</h2>{" "}
          {/* Title for the high scores section */}
        </div>

        {/* Conditional rendering based on availability of high scores */}
        {highScores?.length > 0 ? (
          <div className="space-y-2">
            {/* If there are high scores, display the top 3 */}
            {highScores.slice(0, 3).map((score, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
              >
                <span className="text-gray-600">
                  {new Date(score.date).toLocaleDateString("en-GB", {
                    day: "2-digit", // Format the date to show day, month, and year
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="font-semibold text-purple-600">
                  {score.score} points
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No high scores yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default StartScreen;
