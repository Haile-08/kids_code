import React from 'react';
import logo from '../../../assets/logo.png';
import nav from '../../../assets/nav.png';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function NavBar() {
  const navigate = useNavigate();

  const handleHomeNav = () => {
    navigate('/');
  };
  return (
    <motion.div
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <motion.div
        className="logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 2 }}
      >
        <img src={logo} alt="logo" onClick={() => handleHomeNav()} />
      </motion.div>
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
        <NavLink to="/signup">
          <p>SignUp</p>
        </NavLink>
      </div>
      <motion.div
        className="navlogo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 2 }}
      >
        <img src={nav} alt="nav" />
      </motion.div>
    </motion.div>
  );
}

export default NavBar;
