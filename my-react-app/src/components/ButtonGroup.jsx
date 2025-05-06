import React from 'react';
import '../App.css';

const ButtonGroup = ({ 
  labels = ["General", "Disponibilidad", "Accesibilidad", "Adaptabilidad", "Aceptabilidad"],
  selectedIndex,
  onButtonClick
}) => {
  return (
    <ul
      id="button-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0', // No gap between items
        width: '100%',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {labels.map((label, index) => (
        <li
          key={label}
          className={`button ${index === selectedIndex ? 'active' : ''}`}
          onClick={() => onButtonClick(index)}
          style={{
            padding: '0 0 0 10px', // Padding only on left
            backgroundColor: index === selectedIndex ? '#007bff' : '#fafafa',
            color: index === selectedIndex ? 'white' : '#333',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.1s',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            textAlign: 'left',
            width: '100%',
            boxSizing: 'border-box',
            borderBottom: index < labels.length - 1 ? '1px solid #e0e0e0' : 'none', // Light gray separator
            lineHeight: '35px', // Fixed height for consistency
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

export default ButtonGroup;