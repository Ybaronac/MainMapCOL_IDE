import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VisualizationTool from './components/VisualizationTool.jsx';
import Resources from './components/Resources.jsx';
import About from './components/About.jsx';
import Credits from './components/Credits.jsx';
import Description from './components/Description.jsx';
import History from './components/History.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const App = () => (
  <BrowserRouter basename="/MainMapCOL_IDE">
    <div className="app-wrapper min-h-screen flex flex-col">
      <Header />

      {/* ← ESTE ES EL CONTENEDOR QUE TE FALTABA → */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Description />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/visualization-tool" element={<VisualizationTool />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      <Footer />
    </div>
  </BrowserRouter>
);

export default App;