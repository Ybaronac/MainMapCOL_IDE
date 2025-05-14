import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/YearSlider.css';
import { generalColours, yearSliderGeneralColours, years} from '../config/config.js';

const YearSlider = ({
  width = 500,
  selectedYear,
  onYearChange,
  buttonIndex = 0,
}) => {
  const marks = years.reduce((acc, year) => {
    acc[year] = year.toString();
    return acc;
  }, {});

  const [isActive, setIsActive] = useState(false);

  const handleChange = (value) => {
    onYearChange(value);
  };

  const normalBorderColor = generalColours[buttonIndex % generalColours.length] || '#1890ff';
  const haloColor = yearSliderGeneralColours[buttonIndex % yearSliderGeneralColours.length] || '#e6f7ff';

  const sliderStyle = {
    '--halo-color': haloColor,
  };

  const handleStyle = {
    borderColor: isActive ? haloColor : normalBorderColor,
    height: isActive ? 24 : 20,
    width: isActive ? 24 : 20,
    marginTop: isActive ? -10 : -8,
    backgroundColor: '#fff',
    borderWidth: isActive ? 5 : 3,
    borderStyle: 'solid',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  };

  return (
    <div id="year-slider" style={{ width: width + 60, padding: '5px', ...sliderStyle }}>
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
        onBeforeChange={() => setIsActive(true)}
        onAfterChange={() => setIsActive(false)}
      />
    </div>
  );
};

export default YearSlider;