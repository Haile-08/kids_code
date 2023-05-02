import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './navbar.css';

function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="signin">
        <button type="button">
          <NavLink to="/login">Sign In</NavLink>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
