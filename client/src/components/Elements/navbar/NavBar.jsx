import React from 'react';
import logo from '../../../assets/logo.png';
import './navbar.css';

function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="signin">
        <button type="button">Sign In</button>
      </div>
    </div>
  );
}

export default NavBar;