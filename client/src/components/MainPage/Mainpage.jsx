/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';
import image from '../../assets/a.png';
import { setLogout } from '../../state/authSlice';
import { dispatchIfVar, dispatchRedVar } from '../../state/actionSlice';

function Mainpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };
  const handlelevel4nav = () => {
    dispatch(dispatchRedVar());
    navigate('/level4');
  };
  const handlelevel5nav = () => {
    dispatch(dispatchIfVar());
    navigate('/level5');
  };
  const handlelevel6nav = () => {
    navigate('/level6');
  };
  const handlelevel7nav = () => {
    navigate('/level7');
  };
  return (
    <div className="mainpage">
      <div className="profile">
        <div className="nav">
          <img src={image} alt="profileimage" />
          <p>Haile</p>
          <button onClick={() => handleLogout()} type="button">
            Logout
          </button>
        </div>
      </div>
      <div className="mainpart">
        <div className="level" onClick={() => navigate('/level')}>
          level 1
        </div>
        <div className="level" onClick={() => navigate('/level2')}>
          level 2
        </div>
        <div className="level" onClick={() => navigate('/level3')}>
          level 3
        </div>
        <div className="level" onClick={() => handlelevel4nav()}>
          level 4
        </div>
        <div className="level" onClick={() => handlelevel5nav()}>
          level 5
        </div>
        <div className="level" onClick={() => handlelevel6nav()}>
          level 6
        </div>
        <div className="level" onClick={() => handlelevel7nav()}>
          level 7
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
