import React from 'react';
import WebpageContent from '../config/WebpageContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="nav-container">
        <p>© {currentYear} {WebpageContent.footer_copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;