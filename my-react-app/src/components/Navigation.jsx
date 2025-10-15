import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import WebpageContent from '../config/WebpageContent';

const Navigation = () => (
  <nav className="nav-container">
    <div className="nav-links">
      <Link to="/" className="nav-link">{WebpageContent.navigation_home}</Link>
      <Link to="/about" className="nav-link">{WebpageContent.navigation_about}</Link>
      <Link to="/visualization-tool" className="nav-link">{WebpageContent.navigation_visualization_tool}</Link>
      <Link to="/history" className="nav-link">{WebpageContent.navigation_history}</Link>
      <Link to="/resources" className="nav-link">{WebpageContent.navigation_resources}</Link>
    </div>
  </nav>
);

export default Navigation;