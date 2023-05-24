/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import { QuestionsList } from './QuestionsList';

const Quiz = ({ setScore, score, setGameState }) => {
  const [chosenAnswer, setChosenAnswer] = useState('');
  const [enableErrMsg, setEnableErrMsg] = useState(false);
  const [currentQuestion, setcurrentQuestion] = useState(0);

  const handleAnswer = () => {
    const rightAnswer = QuestionsList[currentQuestion].answer;
    if (currentQuestion === QuestionsList.length - 1) {
      setScore(score + 1);
      setEnableErrMsg(false);
      setGameState('endScreen');
    } else {
      if (chosenAnswer === rightAnswer) {
        setScore(score + 1);
        setEnableErrMsg(false);
      } else {
        setcurrentQuestion(currentQuestion + 1);
        setEnableErrMsg(true);
      }
    }
  };
  return (
    <>
      <h1>quiz(?)</h1>
      {currentQuestion}
      {enableErrMsg ? <h2 style={{ color: 'red' }}>Think again</h2> : null}
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
      </div>

      <button className="nextBtn" onClick={() => handleAnswer()}>
        {currentQuestion === QuestionsList.length - 1 ? 'finish quiz' : 'next'}
      </button>
    </>
  );
};

export default Quiz;
