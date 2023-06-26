import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionsList } from './QuestionsList';

const EndScreen = ({ score, setGameState, setScore }) => {
  return (
    <div>
      <h2> You have Finished the quiz</h2>

      {score >= QuestionsList.length - 1 ? (
        <h1 className="endScreen-msg">Excellent keep going </h1>
      ) : score >= QuestionsList.length - 2 ? (
        <h2 className="endScreen-msg">good one keep it up </h2>
      ) : (
        <h1 className="endScreen-msg">you will do better next time</h1>
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
