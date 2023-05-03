import React from 'react';
import './style.css';
import image from '../../assets/a.png';

function Mainpage() {
  return (
    <div className="mainpage">
      <div className="profile">
        <div className="nav">
          <img src={image} alt="image" />
          <p>Haile</p>
          <button>Logout</button>
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
