import React from 'react';
import './Home.css';
import introImage from '../../assets/Gaming.gif';
import NavBar from '../Elements/navbar/NavBar';

function Home() {
  return (
    <div className="main">
      <NavBar />
      <div className="mainHome">
        <div className="text">
          <p>Code kid a Fun and Interactive Coding Experience for kids</p>
        </div>
        <div className="image">
          <img src={introImage} alt="imageintro" />
        </div>
      </div>
    </div>
  );
}

export default Home;
