import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import D3Map from './D3Map';
import BarChart from './BarChart';
import Legend from './Legend';
import YearSlider from './YearSlider';
import ButtonGroup from './ButtonGroup';
import CollapsibleMenuContainer from './CollapsibleMenuContainer';
import LineChart from './LineChart';
import { labels, years, generalColours, yearSliderGeneralColours } from '../config/config.js';
import { IDE_COLOMBIA_CHOROPLETH, IDE_ETC_CHOROPLETH } from '../config/configURLDataSource.js';

const VisualizationTool = () => {
  const [dataIDE, setDataIDE] = useState(new Map());
  const [countryData, setCountryData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [expandAllMenu, setExpandAllMenu] = useState(false);
  const visualizationRef = useRef(null);
  const menuRef = useRef(null);

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
    }
  };

  const handleScreenshot = async () => {
    if (!visualizationRef.current || !menuRef.current) return;

    try {
      const regionName = selectedRegion
        ? selectedRegion.properties[config.ETC.idProperty]
        : 'Colombia';

      // Expand all menu sections
      setExpandAllMenu(true);

      // Wait for menu to expand AND for all D3 animations to complete
      await new Promise(resolve => setTimeout(resolve, 1500));

      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--page-bg').trim() || '#ffffff';

      // Capture grid visualization
      const gridCanvas = await html2canvas(visualizationRef.current, {
        backgroundColor: bgColor,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // Capture expanded menu
      const menuCanvas = await html2canvas(menuRef.current, {
        backgroundColor: bgColor,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add grid visualization to first page
      const gridImgData = gridCanvas.toDataURL('image/png');
      const pdfWidth = 297; // A4 landscape width in mm
      const pdfHeight = 210; // A4 landscape height in mm
      const gridImgWidth = pdfWidth;
      const gridImgHeight = (gridCanvas.height * pdfWidth) / gridCanvas.width;

      // If image is taller than page, scale it down
      if (gridImgHeight > pdfHeight) {
        const scaledWidth = (pdfHeight * gridCanvas.width) / gridCanvas.height;
        pdf.addImage(gridImgData, 'PNG', (pdfWidth - scaledWidth) / 2, 0, scaledWidth, pdfHeight);
      } else {
        pdf.addImage(gridImgData, 'PNG', 0, (pdfHeight - gridImgHeight) / 2, gridImgWidth, gridImgHeight);
      }

      // Add new page for menu
      pdf.addPage();

      // Add menu visualization to second page
      const menuImgData = menuCanvas.toDataURL('image/png');
      const menuImgWidth = pdfWidth;
      const menuImgHeight = (menuCanvas.height * pdfWidth) / menuCanvas.width;

      // If image is taller than page, scale it down
      if (menuImgHeight > pdfHeight) {
        const scaledWidth = (pdfHeight * menuCanvas.width) / menuCanvas.height;
        pdf.addImage(menuImgData, 'PNG', (pdfWidth - scaledWidth) / 2, 0, scaledWidth, pdfHeight);
      } else {
        pdf.addImage(menuImgData, 'PNG', 0, (pdfHeight - menuImgHeight) / 2, menuImgWidth, menuImgHeight);
      }

      // Download PDF
      pdf.save(`visualization_${regionName}_${selectedYear}.pdf`);

      // Restore menu state
      setTimeout(() => {
        setExpandAllMenu(false);
      }, 500);

    } catch (error) {
      console.error('Error capturing screenshot:', error);
      setExpandAllMenu(false);
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
        ref={visualizationRef}
        className="visualization-grid mt-8"
        style={{
          '--accent-color': generalColours[buttonIndex % generalColours.length],
          '--halo-color': yearSliderGeneralColours[buttonIndex % yearSliderGeneralColours.length],
          '--active-bg': generalColours[buttonIndex % generalColours.length],
        }}
      >
        {/* Column 1: ButtonGroup */}
        <div className="grid-buttons">
          <ButtonGroup selectedIndex={buttonIndex} onButtonClick={handleButtonClick} labels={labels} />
        </div>

        {/* Column 2: Map Section */}
        <div className="grid-map">
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

        {/* Column 3: BarChart, LineChart and Screenshot Button */}
        <div className="grid-chart">
          <BarChart data={barChartData} selectedYear={selectedYear} selectedRegion={selectedRegion} labels={labels} dataType="ETC" />
          <div style={{ paddingTop: '1.5rem' }}>
            <LineChart
              selectedData={selectedData}
              selectedRegion={selectedRegion}
              selectedIndex={buttonIndex}
              dataType="ETC"
            />
          </div>

          {/* Screenshot Button */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={handleScreenshot}
              className="screenshot-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <Download size={16} />
              Descargar PDF
            </button>
          </div>
        </div>
      </div>

      <div ref={menuRef} style={{ paddingTop: '2rem' }}>
        <div className="collapsible-menu-container mt-8">
          <CollapsibleMenuContainer
            selectedYear={selectedYear}
            selectedRegion={selectedRegion}
            selectedIndex={buttonIndex}
            expandAll={expandAllMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualizationTool;