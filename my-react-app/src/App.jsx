import React from 'react';
import MapVisualization from "./MapVisualization.jsx";
import CollapsibleMenuContainer from './components/CollapsibleMenuContainer.jsx';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Description from './components/Description.jsx';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <div className="main-content-area">
      <div className="content-container">
        <Description />
        <MapVisualization />
        <CollapsibleMenuContainer />
      </div>
    </div>
    <Footer />
  </div>
);

export default App;