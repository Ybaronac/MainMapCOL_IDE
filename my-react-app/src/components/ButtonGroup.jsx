import React from 'react';
import '../App.css';
import { labels, generalColours } from '../config/config.js';
import '../styles/D3Map.css';


const ButtonGroup = ({ 
  labels: propLabels = labels,
  selectedIndex,
  onButtonClick
}) => {
  return (
    <ul
      id="button-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        width: '100%',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {propLabels.map((label, index) => (
        <li
          key={label}
          className={`button ${index === selectedIndex ? 'active' : ''}`}
          onClick={() => onButtonClick(index)}
          style={{
            padding: '0 0 0 10px',
            backgroundColor: index === selectedIndex ? generalColours[index % generalColours.length] : '#fafafa',
            color: index === selectedIndex ? 'white' : '#333',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.1s',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            textAlign: 'left',
            width: '100%',
            boxSizing: 'border-box',
            borderBottom: index < propLabels.length - 1 ? '1px solid #e0e0e0' : 'none',
            lineHeight: '35px',
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

export default ButtonGroup;