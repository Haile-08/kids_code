import React from 'react';
import { motion } from 'framer-motion';
import './quiz.css';

const QuizStartPage = ({ setGameState }) => {
  return (
    <div className="mpage">
      <h1>
        Congratulation on Finishing the game now test your comperhension using
        this quiz
      </h1>
      <motion.button
        className="startBtn"
        onClick={() => {
          setGameState('quiz');
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        Start Quiz
      </motion.button>
    </div>
  );
};

export default QuizStartPage;
