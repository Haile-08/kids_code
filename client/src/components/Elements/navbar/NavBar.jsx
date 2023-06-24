import React from 'react';
import logo from '../../../assets/logo.png';
import nav from '../../../assets/nav.png';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleHomeNav = () => {
    navigate('/');
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" onClick={() => handleHomeNav()} />
      </div>
      <div className="nav1">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <p>About</p>
      </div>
      <div className="nav2">
        <p>Login</p>
        <p>Signup</p>
      </div>
      <div className="navlogo">
        <img src={nav} alt="nav" />
      </div>
    </div>
  );
}

export default NavBar;
