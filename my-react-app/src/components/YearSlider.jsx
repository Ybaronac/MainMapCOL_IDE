import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {generalColours, yearSliderGeneralColours } from '../config/config.js';

const YearSlider = ({ 
  width = 500,
  years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  selectedYear,
  onYearChange,
  buttonIndex = 0 // Default to 0 (General)
}) => {
  const marks = years.reduce((acc, year) => {
    acc[year] = year.toString();
    return acc;
  }, {});

  const [isActive, setIsActive] = useState(false); // Estado para rastrear si el handle está activo

  const handleChange = (value) => {
    onYearChange(value);
  };

  // Select colors based on buttonIndex
  const normalBorderColor = generalColours[buttonIndex % generalColours.length] || '#1890ff';
  const haloColor = yearSliderGeneralColours[buttonIndex % yearSliderGeneralColours.length] || '#e6f7ff';

  // Log para depurar (puedes eliminarlo después de verificar)
  console.log(`buttonIndex: ${buttonIndex}, haloColor: ${haloColor}`);

  const handleStyle = {
    borderColor: isActive ? haloColor : normalBorderColor, // Usa haloColor cuando está activo
    height: isActive ? 24 : 20,
    width: isActive ? 24 : 20,
    marginTop: isActive ? -10 : -8,
    backgroundColor: '#fff',
    borderWidth: isActive ? 4 : 2,
    borderStyle: 'solid',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  };

  return (
    <div id="year-slider" style={{ width: width + 60, padding: '5px' }}>
      <Slider
        min={Math.min(...years)}
        max={Math.max(...years)}
        value={selectedYear}
        onChange={handleChange}
        marks={marks}
        step={1}
        included={false}
        dotStyle={{ display: 'none' }}
        activeDotStyle={{ display: 'none' }}
        railStyle={{ backgroundColor: '#e9e9e9' }}
        trackStyle={{ backgroundColor: '#1890ff' }}
        handleStyle={handleStyle}
        onBeforeChange={() => setIsActive(true)} // Activa el efecto al comenzar a interactuar
        onAfterChange={() => setIsActive(false)} // Desactiva el efecto al soltar
      />
    </div>
  );
};

export default YearSlider;