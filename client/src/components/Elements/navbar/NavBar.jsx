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
        <NavLink to="/about">
          <p>About</p>
        </NavLink>
      </div>
      <div className="nav2">
        <NavLink to="/login">
          <p>Login</p>
        </NavLink>
        <NavLink to="/register">
          <p>SignUp</p>
        </NavLink>
      </div>
      <div className="navlogo">
        <img src={nav} alt="nav" />
      </div>
    </div>
  );
}

export default NavBar;
