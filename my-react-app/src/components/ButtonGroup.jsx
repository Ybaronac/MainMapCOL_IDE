import React from 'react';
import { labels, generalColours } from '../config/config.js';

const ButtonGroup = ({ 
  labels: propLabels = labels,
  selectedIndex,
  onButtonClick
}) => {
  return (
    <ul id="button-container" className="button-group">
      {propLabels.map((label, index) => {
        const isActive = index === selectedIndex;
        const varStyle = isActive ? { '--active-bg': generalColours[index % generalColours.length] } : undefined;

        return (
          <li
            key={label}
            role="button"
            tabIndex={0}
            className={`button-item ${isActive ? 'active' : ''}`}
            onClick={() => onButtonClick(index)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onButtonClick(index); }}
            style={varStyle}            // <-- set CSS var instead of backgroundColor
            aria-pressed={isActive}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonGroup;