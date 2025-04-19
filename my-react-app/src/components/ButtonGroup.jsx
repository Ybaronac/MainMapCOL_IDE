import React from 'react';

const ButtonGroup = ({ 
  labels = ["General", "Disponibilidad", "Accesibilidad", "Adaptabilidad", "Aceptabilidad"],
  selectedIndex,
  onButtonClick
}) => {
  return (
    <div id="button-container">
      {labels.map((label, index) => (
        <button
          key={label}
          className={`button ${index === selectedIndex ? 'active' : ''}`}
          onClick={() => onButtonClick(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup; 