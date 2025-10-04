import React from 'react';
import '../styles/Footer.css';
import WebpageContent from '../config/WebpageContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>© {currentYear} {WebpageContent.footer_copyright}</p>
    </footer>
  );
};

export default Footer;