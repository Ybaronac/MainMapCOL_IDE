import React, { useState } from 'react';
import MapVisualization from "./MapVisualization.jsx";
import CollapsibleMenuContainer from './components/CollapsibleMenuContainer.jsx';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';


const App = () => (
  <div>
    <Header />
    <div>
      <h2>Colombia Map Visualization</h2>
      <MapVisualization />
      <CollapsibleMenuContainer />
    </div>
    <Footer />
  </div>
  
);

export default App;
