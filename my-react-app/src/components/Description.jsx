import React from 'react';
import '../styles/Description.css';

const Description = () => {
  return (
    <div className="description-container">
      <h2 className="description-title">About the Visualization</h2>
      <div className="description-content">
        <p>This interactive visualization allows you to explore educational indicators across different departments in Colombia. You can analyze various aspects including availability, accessibility, adaptability, and acceptability of education through different years.</p>
        <p>Use the buttons above to switch between different indicators and the slider to change years. Click on departments to see detailed information.</p>
      </div>
    </div>
  );
};

export default Description;