import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import D3Map from './D3Map';
import BarChart from './BarChart';
import Legend from './Legend';
import YearSlider from './YearSlider';
import ButtonGroup from './ButtonGroup';
import CollapsibleMenuContainer from './CollapsibleMenuContainer';
import { labels, years, generalColours, yearSliderGeneralColours } from '../config/config.js';
import { IDE_COLOMBIA_CHOROPLETH, IDE_ETC_CHOROPLETH } from '../config/configURLDataSource.js';

const VisualizationTool = () => {
  const [dataIDE, setDataIDE] = useState(new Map());
  const [countryData, setCountryData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const config = {
    ETC: {
      url: IDE_ETC_CHOROPLETH,
      idProperty: 'CODIGO_ETC',
    },
  };

  useEffect(() => {
    const mapPromises = [
      d3.json(config.ETC.url),
      d3.json(IDE_COLOMBIA_CHOROPLETH)
    ];

    Promise.all(mapPromises).then(([ideData, countryIdeData]) => {
      const newDataIDE = new Map();
      ideData.forEach(d => {
        const id = Number(d[config.ETC.idProperty]);
        newDataIDE.set(id, d.rates);
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

  const handleRegionClick = (region, rates) => {
    if (region === null) {
      setSelectedRegion(null);
      setSelectedData(countryData);
    } else {
      setSelectedRegion(region);
      // No establecemos selectedData aquí, lo hará el useEffect
    }
  };

  // Actualizar datos cuando cambie la región seleccionada
  useEffect(() => {
    if (selectedRegion && dataIDE.size > 0) {
      const regionID = Number(selectedRegion.properties[config.ETC.idProperty]);
      const rates = dataIDE.get(regionID);
      if (rates) {
        setSelectedData(rates);
      } else {
        // Si no hay datos para la región, usar datos del país
        setSelectedData(countryData);
      }
    } else if (!selectedRegion && countryData) {
      setSelectedData(countryData);
    }
  }, [selectedRegion, dataIDE, countryData]);

  const barChartData = selectedData && selectedData[selectedYear]
    ? Object.entries(selectedData[selectedYear])
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value], i) => ({
        group: labels[i] || key,
        value: parseFloat(value) || 0,
      }))
    : [];

  return (
    <div>
      <TitleHeader />
      <div style={{ paddingBottom: '2.5rem' }}>

        <TextSection
          content={[
            { type: 'title', text: WebpageContent.VTool_title },
            { type: 'paragraph', text: WebpageContent.VTool_paragraph },
          ]}
        />
      </div>

      <div
        className="visualization-container mt-8 flex flex-col lg:flex-row gap-8 w-full max-w-[1200px] mx-auto"
        style={{
          '--accent-color': generalColours[buttonIndex % generalColours.length],
          '--halo-color': yearSliderGeneralColours[buttonIndex % yearSliderGeneralColours.length],
          '--active-bg': generalColours[buttonIndex % generalColours.length],
        }}
      >
        <div className="left-column flex-1 min-w-0 flex flex-col gap-4">
          <div className="map-box w-full">
            <YearSlider selectedYear={selectedYear} onYearChange={handleYearChange} buttonIndex={buttonIndex} />
            <div className="map-content w-full">
              <D3Map
                selectedYear={selectedYear}
                buttonIndex={buttonIndex}
                dataIDE={dataIDE}
                countryData={countryData}
                onRegionClick={handleRegionClick}
                selectedRegion={selectedRegion}
                dataType="ETC"
              />
              <Legend buttonIndex={buttonIndex} />
            </div>
          </div>
        </div>

        <div className="right-column w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-6">
          <div className="button-sidebar w-full">
            <h3 className="menu-title">{WebpageContent.button_group_label}</h3>
            <ButtonGroup selectedIndex={buttonIndex} onButtonClick={handleButtonClick} labels={labels} />
          </div>

          <div className="chart-box w-full">
            <BarChart data={barChartData} selectedYear={selectedYear} selectedRegion={selectedRegion} labels={labels} dataType="ETC" />
          </div>
        </div>
      </div>

      <div className="collapsible-menu-container mt-8">
        <CollapsibleMenuContainer selectedYear={selectedYear} selectedRegion={selectedRegion} selectedIndex={buttonIndex} dataType="ETC" />
      </div>
    </div>
  );
};

export default VisualizationTool;