import React from 'react';

const QuizStartPage = ({ setGameState }) => {
  return (
    <div>
      <h1>
        Congratulation on Finishing the game now test your comperhension using
        this quiz
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
