import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { generalColours, yearSliderGeneralColours, years } from '../config/config.js';

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

  return (
    <div
      className="year-slider"
      style={{
        width: width + 60,
        '--halo-color': haloColor,
        '--normal-border-color': normalBorderColor,
        '--track-bg': normalBorderColor,
      }}
    >
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
        onBeforeChange={() => setIsActive(true)}
        onAfterChange={() => setIsActive(false)}
      />
    </div>
  );
};

export default YearSlider;