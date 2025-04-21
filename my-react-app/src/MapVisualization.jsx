import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import D3Map from './components/D3Map';
import BarChart from './components/BarChart';
import Legend from './components/Legend';
import YearSlider from './components/YearSlider';
import ButtonGroup from './components/ButtonGroup';
import './App.css';

const MapVisualization = () => {
  const [dataIDE, setDataIDE] = useState(new Map());
  const [countryData, setCountryData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2007);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const mapPromises = [
      d3.json("https://gist.githubusercontent.com/Ybaronac/ea35627ef169446ee9624421eef8e4fd/raw/544b2eb70a1904f9952f8e3ed651a0e3272f0e82/IDE_ColTest.json"),
      d3.json("https://gist.githubusercontent.com/Ybaronac/df3edd8c29daa4855a6617b81f52a1cf/raw/c8d9cba48532150223764f23cb125874fcb350ee/IDE_ColGeneralTest.json")
    ];

    Promise.all(mapPromises).then(([ideData, countryIdeData]) => {
      const newDataIDE = new Map();
      ideData.forEach(d => {
        newDataIDE.set(Number(d.departmentID), d.rates);
      });
      setDataIDE(newDataIDE);
      setCountryData(countryIdeData[0].rates);
      setSelectedData(countryIdeData[0].rates);
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

  const barChartData = selectedData ? Object.entries(selectedData[selectedYear]).map(([group, value]) => ({
    group,
    value: parseFloat(value)
  })) : [];

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
    <div className="app">
      <div className="visualization-container">
        <div className="button-sidebar">
          <h3 className="menu-title">Categorías</h3>
          <ButtonGroup
            selectedIndex={buttonIndex}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div className="map-box">
          <div className="map-content">
            <YearSlider
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
              width={600}
            />
            <D3Map
              selectedYear={selectedYear}
              buttonIndex={buttonIndex}
              dataIDE={dataIDE}
              countryData={countryData}
              onDepartmentClick={handleDepartmentClick}
              selectedDepartment={selectedDepartment}
              width={800}
              height={600}
            />
            <Legend
              buttonIndex={buttonIndex}
              width={750}
            />
          </div>
        </div>
        <div className="chart-box">
          <BarChart
            data={barChartData}
            selectedYear={selectedYear}
            selectedDepartment={selectedDepartment}
          />
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;