import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const YearSlider = ({ 
  width = 500,
  years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  selectedYear,
  onYearChange
}) => {
  const marks = years.reduce((acc, year) => {
    acc[year] = year.toString();
    return acc;
  }, {});

  const handleChange = (value) => {
    onYearChange(value);
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
        handleStyle={{
          borderColor: '#1890ff',
          height: 20,
          width: 20,
          marginTop: -8,
          backgroundColor: '#fff',
        }}
      />
    </div>
  );
};

export default YearSlider; 