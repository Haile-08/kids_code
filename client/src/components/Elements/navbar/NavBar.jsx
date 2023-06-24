import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import nav from '../../../assets/nav.png';
import './navbar.css';

function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navlogo">
        <img src={nav} alt="nav" />
      </div>
    </div>
  );
}

export default NavBar;
