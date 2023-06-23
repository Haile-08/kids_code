import React, { useState } from 'react';
import QuizStartPage from './QuizStartPage';
import Quiz from './Quiz';
import EndScreen from './EndScreen';
import './quiz.css';

const QuizApp = () => {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);

  return (
    <div className="quiz-container">
      <div className="quiz-app">
        {' '}
        {gameState === 'menu' && <QuizStartPage setGameState={setGameState} />}
        {gameState === 'quiz' && (
          <Quiz setGameState={setGameState} setScore={setScore} score={score} />
        )}
        {gameState === 'endScreen' && (
          <EndScreen
            setGameState={setGameState}
            score={score}
            setScore={setScore}
          />
        )}
      </div>
    </div>
  );
};

export default QuizApp;
