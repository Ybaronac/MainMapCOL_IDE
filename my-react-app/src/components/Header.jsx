import React from 'react';
import Navigation from './Navigation.jsx';
import '../styles/Header.css';

const Header = () => (
  <>
    <header className="header">
      <h1>Colombia Map Visualization</h1>
      <p>Interactive visualization of departmental data</p>
    </header>
    <div className="sub-header-bar">
      <Navigation />
    </div>
  </>
);

export default Header;