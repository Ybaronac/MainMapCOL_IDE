import React from 'react';
import Navigation from './Navigation.jsx';
import '../styles/Header.css';
import WebpageContent from '../config/WebpageContent';

const Header = () => (
  <>
    <header className="header">
      <h1>{WebpageContent.header_title}</h1>
      <p>{WebpageContent.header_subtitle}</p>
    </header>
    <div className="sub-header-bar">
      <Navigation />
    </div>
  </>
);

export default Header;