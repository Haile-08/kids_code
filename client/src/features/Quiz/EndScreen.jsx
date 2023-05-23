/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionsList } from './QuestionsList';

const EndScreen = ({ score }) => {
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

      <Link to="/level">
        <button>Go back to the Game</button>
      </Link>
    </div>
  );
};

export default EndScreen;
