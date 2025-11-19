import React from 'react';
import Navigation from './Navigation.jsx';
import WebpageContent from '../config/WebpageContent';
import ThemeToggle from './ThemeToggle.jsx';

const Header = () => (
  <>
    <header className="header">
      <div className="nav-container flex items-center justify-between">
        <div>
          <h1 className="header-title">{WebpageContent.header_title}</h1>
          <p className="header-subtitle">{WebpageContent.header_subtitle}</p>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <Navigation />
  </>
);

export default Header;