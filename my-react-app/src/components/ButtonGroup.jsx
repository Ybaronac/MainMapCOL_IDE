import React, { useState } from 'react';
import { labels, generalColours } from '../config/config.js';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';

const ButtonGroup = ({
  labels: propLabels = labels,
  selectedIndex,
  onButtonClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const selectedLabel = propLabels[selectedIndex];
  const activeColor = generalColours[selectedIndex % generalColours.length];

  return (
    <div className="button-group-container">
      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        style={{ '--active-color': activeColor }}
        aria-expanded={isOpen}
      >
        <span className="toggle-label">
          <span className="toggle-text">Categoría:</span>
          <span className="active-category" style={{ color: activeColor }}>{selectedLabel}</span>
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Button List */}
      <ul id="button-container" className={`button-group ${isOpen ? 'open' : ''}`}>
        {propLabels.map((label, index) => {
          const isActive = index === selectedIndex;
          const varStyle = isActive ? { '--active-bg': generalColours[index % generalColours.length] } : undefined;

          return (
            <li
              key={label}
              role="button"
              tabIndex={0}
              className={`button-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onButtonClick(index);
                setIsOpen(false); // Close menu on selection
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onButtonClick(index);
                  setIsOpen(false);
                }
              }}
              style={varStyle}
              aria-pressed={isActive}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ButtonGroup;
