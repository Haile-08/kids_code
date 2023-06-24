import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { setLogout } from '../../state/authSlice';
import { dispatchIfVar, dispatchRedVar } from '../../state/actionSlice';
import logoCK from '../../assets/logo CK.svg';
import medal1 from '../../assets/medal 1.svg';
import mainpageYellow from '../../assets/main page yellowdown.svg';
import mainpageChar from '../../assets/mainpage character.svg';

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
          <img src={logoCK} alt="logo" className="logo" />
          <div className="left-mainpage-nav">
            <img src={medal1} alt="medal" className="medalImage" />
            <h3>Score:50</h3>
            <img
              src={mainpageYellow}
              alt="profileimage"
              className="profileImage"
            />
            <p>Haile</p>
            <button onClick={() => handleLogout()} type="button">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="mainpage-main-container">
        <div className="mainpage-robot">
          <img src={mainpageChar} alt="" />
        </div>
        <div className="mainpage-description">
          <h2>Change Color</h2>
          <p>
            Our mission is to help our trusty robot companion reach her
            destination and avoid detection by the enemy bots. How do we do
            that, you ask? By changing her color to look the same as the Enemy.
          </p>
          <p>Color(red)</p>
        </div>
        <div className="mainpage-slides">
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
    </div>
  );
}

export default Mainpage;
