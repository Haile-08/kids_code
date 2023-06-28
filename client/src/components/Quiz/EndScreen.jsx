import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLogin } from '../../state/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const EndScreen = ({ score, setGameState, setScore }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { level } = state;

  const handleLevel = () => {
    console.log(level);
    axios
      .post('http://localhost:3555/update/level', {
        email: user.email,
        value: level,
        token: token,
      })
      .then(function (res) {
        return res;
      })
      .then(function (resData) {
        dispatch(
          setLogin({
            user: resData?.data.user,
            token: resData?.data.token,
          })
        );
      });
  };
  const handleScore = () => {
    axios
      .post('http://localhost:3555/update/score', {
        email: user.email,
        value: 50,
        token: token,
      })
      .then(function (res) {
        return res;
      })
      .then(function (resData) {
        dispatch(
          setLogin({
            user: resData?.data.user,
            token: resData?.data.token,
          })
        );
        navigate('/main');
      });
  };
  return (
    <div>
      <h2> You have Finished the quiz</h2>

      {score >= 2 ? (
        <h1 className="endScreen-msg">Excellent keep going </h1>
      ) : score >= 1 ? (
        <h2 className="endScreen-msg">good one keep it up </h2>
      ) : (
        <h1 className="endScreen-msg">you will do better next time</h1>
      )}
      <h2>{score}/3</h2>

      {score > 2 ? (
        <button
          onClick={() => {
            handleLevel();
            handleScore();
            setScore(0);
          }}
        >
          Go back to the Game
        </button>
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
