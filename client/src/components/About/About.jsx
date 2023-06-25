import React from 'react';
import NavBar from '../Elements/navbar/NavBar';
import bot from '../../assets/bot.svg';
import './About.css';

function About() {
  return (
    <div className="about_main">
      <NavBar />
      <div className="about_container">
        <div className="about_text">
          <h1>Kidicode</h1>
          <hr />
          <p>
            Welcome to Codikid, a cutting-edge educational platform dedicated to
            empowering the next generation of African technology enthusiasts.
            Our mission is to bridge the digital divide by providing young
            learners with an engaging and interactive experience that introduces
            them to the world of programming. Through our innovative game-based
            approach, we aim to inspire and equip students with the skills and
            knowledge required to excel in the rapidly evolving tech landscape.
            Join us as we embark on this exciting journey to foster digital
            literacy and unlock the potential of African students on the global
            stage.
          </p>
        </div>
        <div className="bot_image">
          <img src={bot} alt="bot" />
        </div>
      </div>
    </div>
  );
}

export default About;
