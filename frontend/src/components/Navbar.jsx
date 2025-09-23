import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Movie Booking</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/history">Booking History</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
