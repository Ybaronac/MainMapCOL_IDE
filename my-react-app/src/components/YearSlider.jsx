import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { generalColours, yearSliderGeneralColours, years } from '../config/config.js';
import WebpageContent from '../config/WebpageContent.js';

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
        width: '100%',
        paddingTop: 0,
        marginTop: '-10px',
        '--halo-color': haloColor,
        '--normal-border-color': normalBorderColor,
        '--track-bg': normalBorderColor,
      }}
    >
      <p className="year-slider-label text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 font-medium -mt-2 mb-0.5 text-center select-none">
        {WebpageContent.year_slider_instruction || "Deslice para ver la información de otros años"}
      </p>
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
        onChangeComplete={() => setIsActive(false)}
      />
    </div>
  );
};

export default YearSlider;