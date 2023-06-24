import React from 'react';
import './Home.css';
import NavBar from '../Elements/navbar/NavBar';
import bot from '../../assets/bot.svg';
import redbot from '../../assets/redbot.png';
import greenbot from '../../assets/greenbot.png';
import yellowbot from '../../assets/yellowbot.png';

function Home() {
  return (
    <div className="main">
      <NavBar />
      <div className="mainHome">
        <h1>Codie Kid</h1>
        <img src={bot} alt="bot" />
      </div>
      <div className="foot">
        <div className="line"></div>
        <p>Game</p>
        <div className="line"></div>
      </div>
      <div className="redbot">
        <p>RedBot</p>
        <img src={redbot} alt="redbot" />
      </div>
      <div className="greenbot">
        <p>GreenBot</p>
        <img src={greenbot} alt="greenbot" />
      </div>
      <div className="yellowbot">
        <p>YellowBot</p>
        <img src={yellowbot} alt="yellowbot" />
      </div>
    </div>
  );
}

export default Home;
