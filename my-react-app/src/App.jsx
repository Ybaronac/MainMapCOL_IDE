import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapVisualization from './MapVisualization.jsx';
import CollapsibleMenuContainer from './components/CollapsibleMenuContainer.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Description from './components/Description.jsx';
import About from './components/About.jsx';
import VisualizationTool from './components/VisualizationTool.jsx';
import Resources from './components/Resources.jsx';
import History from './components/History.jsx'; // Importa el componente History

const App = () => (
  <BrowserRouter>
    <div className="app-wrapper min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-content-area">
              <Description />
           </div>
          }
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/resources"
          element={<Resources />}
        />
        <Route
          path="/visualization-tool"
          element={
            <div className="main-content-area">
              <div className="content-container mx-auto my-8">
                <VisualizationTool />
                <MapVisualization />
              </div>
            </div>
          }
        />
        <Route
          path="/history"
          element={<History />}
        />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;