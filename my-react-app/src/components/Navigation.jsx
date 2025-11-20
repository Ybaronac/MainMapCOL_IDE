import React from 'react';
import { Link } from 'react-router-dom';
import WebpageContent from '../config/WebpageContent';
import { BookOpenText ,FileChartLine , Map, History, LibraryBig   } from 'lucide-react';

const Navigation = () => (
  <nav className="nav-container" aria-label="Main navigation">
    <div className="nav-links">
      <Link to="/" className="nav-link">{<BookOpenText  size={16}/>} {WebpageContent.navigation_home}</Link>
      <Link to="/about" className="nav-link">{<FileChartLine size={16}/>} {WebpageContent.navigation_about}</Link>
      <Link to="/visualization-tool" className="nav-link">{<Map size={16}/>} {WebpageContent.navigation_visualization_tool}</Link>
      <Link to="/history" className="nav-link">{<History size={16}/>} {WebpageContent.navigation_history}</Link>
      <Link to="/resources" className="nav-link">{<LibraryBig size={16}/>} {WebpageContent.navigation_resources}</Link>
    </div>
  </nav>
);

export default Navigation;