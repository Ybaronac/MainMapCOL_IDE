import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import D3Map from './components/D3Map';
import BarChart from './components/BarChart';
import Legend from './components/Legend';
import YearSlider from './components/YearSlider';
import ButtonGroup from './components/ButtonGroup';
import CollapsibleMenuContainer from './components/CollapsibleMenuContainer';
import './App.css';
import {labels, generalColours, yearSliderGeneralColours } from './config/config.js';
import { IDE_DEPARTMENTS_CHOROPLETH, IDE_COLOMBIA_CHOROPLETH, IDE_ETC_CHOROPLETH } from './config/configURLDataSource.js';

const MapVisualization = () => {
  const [dataIDE, setDataIDE] = useState(new Map());
  const [countryData, setCountryData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2007);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);


  useEffect(() => {
    const mapPromises = [
      d3.json(IDE_DEPARTMENTS_CHOROPLETH),
      d3.json(IDE_COLOMBIA_CHOROPLETH)
    ];

    Promise.all(mapPromises).then(([ideData, countryIdeData]) => {
      const newDataIDE = new Map();
      ideData.forEach(d => {
        newDataIDE.set(Number(d.departmentID), d.rates);
      });
      setDataIDE(newDataIDE);
      setCountryData(countryIdeData[0].rates);
      setSelectedData(countryIdeData[0].rates);
    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleButtonClick = (index) => {
    setButtonIndex(index);
  };

  const handleDepartmentClick = (department, rates) => {
    if (department === null) {
      setSelectedDepartment(null);
      setSelectedData(countryData);
    } else {
      setSelectedDepartment(department);
      setSelectedData(rates);
    }
  };

  const barChartData = selectedData
    ? Object.entries(selectedData[selectedYear]).map(([key, value], i) => ({
        group: labels[i] || key,
        value: parseFloat(value),
      }))
    : [];

  useEffect(() => {
    if (selectedDepartment) {
      const deptID = Number(selectedDepartment.properties.DPTO_CCDGO);
      const rates = dataIDE.get(deptID);
      if (rates) {
        setSelectedData(rates);
      }
    } else {
      setSelectedData(countryData);
    }
  }, [selectedYear, buttonIndex, selectedDepartment, dataIDE, countryData]);

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Container: 990px wide, centered */}
      <div
        className="visualization-container"
        style={{
          width: '990px',
          display: 'flex',
          flexDirection: 'row',
          boxSizing: 'border-box',
          marginBottom: '24px',
        }}
      >
        {/* Left Column: 2/3 (~660px) */}
        <div
          style={{
            width: '660px', 
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="map-box"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              width: '100%',
              paddingTop: '10px'

            }}
          >
          <YearSlider
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
                width={596} 
                buttonIndex={buttonIndex}
              />
            <div
              className="map-content"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                paddingTop: '10px'
              }}
            >
              
              <D3Map
                selectedYear={selectedYear}
                buttonIndex={buttonIndex}
                dataIDE={dataIDE}
                countryData={countryData}
                onDepartmentClick={handleDepartmentClick}
                selectedDepartment={selectedDepartment}
                width={660} 
                height={600} 
              />
              <Legend
                buttonIndex={buttonIndex}
                width={596}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: '306px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            className="button-sidebar"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <h3 className="menu-title">Categorías IDE</h3>
            <ButtonGroup
              selectedIndex={buttonIndex}
              onButtonClick={handleButtonClick}
              labels={labels} 
            />
          </div>
          <div
            className="chart-box"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <BarChart
              data={barChartData}
              selectedYear={selectedYear}
              selectedDepartment={selectedDepartment}
              width={310} 
              height={380}
              labels={labels}
            />
          </div>
        </div>
      </div>
      <div
      className="collapsible-menu-wrapper"
      style={{
        width: '990px',
        backgroundColor: 'white',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',

      }}
    >
      <CollapsibleMenuContainer
        selectedYear={selectedYear}
        selectedDepartment={selectedDepartment}
        selectedIndex={buttonIndex}
      />
    </div>
    </div>
  );
};

export default MapVisualization;