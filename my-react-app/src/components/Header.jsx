import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
      <>
        <header className="header">
          <h1>Colombia Map Visualization</h1>
          <p>Interactive visualization of departmental data</p>
        </header>
        <div className="sub-header-bar"></div>
      </>
    );
  };
  
  export default Header; 