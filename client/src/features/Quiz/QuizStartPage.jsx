/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React from 'react';

const QuizStartPage = ({ setGameState }) => {
  return (
    <div>
      <h1>
        Congratulation on Finishing the game now test your comperhension using
        the quiz
      </h1>
      <button
        className="startBtn"
        onClick={() => {
          setGameState('quiz');
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStartPage;
