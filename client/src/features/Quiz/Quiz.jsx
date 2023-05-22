/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import { QuestionsList } from './QuestionsList';

const Quiz = ({ setScore, score, setGameState }) => {
  const [chosenAnswer, setChosenAnswer] = useState('');
  let currentQuestion = 0;
  const handleAnswer = () => {
    const rightAnswer = QuestionsList[currentQuestion].answer;
    if (chosenAnswer === rightAnswer) {
      setScore(score + 1);
      currentQuestion++;
    }
    setGameState('endScreen');
  };
  return (
    <>
      <h1>quiz(?)</h1>
      <h2>{QuestionsList[currentQuestion].prompt}</h2>
      <div className="options">
        <button onClick={() => setChosenAnswer('A')}>
          {QuestionsList[currentQuestion].optionA}
        </button>
        <button onClick={() => setChosenAnswer('B')}>
          {QuestionsList[currentQuestion].optionB}
        </button>
        <button onClick={() => setChosenAnswer('C')}>
          {QuestionsList[currentQuestion].optionC}
        </button>
        <button onClick={() => setChosenAnswer('C')}>
          {QuestionsList[currentQuestion].optionD}
        </button>

        <button className="nextBtn" onClick={() => handleAnswer()}>
          {currentQuestion === QuestionsList.length ? 'finish quiz' : 'next'}
        </button>
      </div>
    </>
  );
};

export default Quiz;
