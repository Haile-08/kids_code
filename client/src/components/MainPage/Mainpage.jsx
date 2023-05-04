import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';
import image from '../../assets/a.png';
import { setLogout } from '../../state/authSlice';

function Mainpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
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
        <div className="level">level 1</div>
        <div className="level">level 2</div>
        <div className="level">level 3</div>
      </div>
    </div>
  );
}

export default Mainpage;
