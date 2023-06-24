import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionsList } from './QuestionsList';

const EndScreen = ({ score, setGameState, setScore }) => {
  return (
    <div>
      <h1> You have Finished the quiz</h1>

      {score >= QuestionsList.length - 1 ? (
        <h2>Excellent keep going </h2>
      ) : score >= QuestionsList.length - 2 ? (
        <h2>good one keep it up </h2>
      ) : (
        <h2>will do better next time</h2>
      )}
      <h2>
        {score}/{QuestionsList.length}
      </h2>

      {score >= QuestionsList.length - 1 ? (
        <Link to="/main">
          <button
            onClick={() => {
              setScore(0);
            }}
          >
            Go back to the Game
          </button>
        </Link>
      ) : (
        <button
          onClick={() => {
            setGameState('quiz');
            setScore(0);
          }}
        >
          retake the exam
        </button>
      )}
    </div>
  );
};

export default EndScreen;
