import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => (
  <nav className="nav-container">
    <div className="nav-links">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/resources" className="nav-link">Resources</Link>
    </div>
  </nav>
);

export default Navigation;