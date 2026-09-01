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
        ? (selectedRegion.properties ? (selectedRegion.properties[config.ETC.idProperty] || selectedRegion.properties.ETC) : 'Region')
        : 'Colombia';

      // Expand all menu sections
      setExpandAllMenu(true);

      // Wait for React to render all expanded nodes
      await new Promise(resolve => setTimeout(resolve, 800));

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

      const pdfWidth = 297; // A4 landscape width in mm
      const pdfHeight = 210; // A4 landscape height in mm
      const pdfMargin = 10;
      const printableWidth = pdfWidth - (pdfMargin * 2);
      const printableHeight = pdfHeight - (pdfMargin * 2);

      // Page 1: Grid visualization (Map + Charts)
      const gridImgData = gridCanvas.toDataURL('image/png');
      const gridAspectRatio = gridCanvas.width / gridCanvas.height;
      let gridWidthMm = printableWidth;
      let gridHeightMm = printableWidth / gridAspectRatio;

      if (gridHeightMm > printableHeight) {
        gridHeightMm = printableHeight;
        gridWidthMm = printableHeight * gridAspectRatio;
      }

      pdf.addImage(
        gridImgData,
        'PNG',
        (pdfWidth - gridWidthMm) / 2,
        (pdfHeight - gridHeightMm) / 2,
        gridWidthMm,
        gridHeightMm
      );

      // Menu pages: Paginate if the fully expanded menu is taller than printableHeight
      const pxPerMm = menuCanvas.width / printableWidth;
      const pageSlicePxHeight = printableHeight * pxPerMm;

      let yOffset = 0;
      while (yOffset < menuCanvas.height) {
        pdf.addPage();
        const slicePxHeight = Math.min(pageSlicePxHeight, menuCanvas.height - yOffset);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = menuCanvas.width;
        pageCanvas.height = slicePxHeight;
        const pageCtx = pageCanvas.getContext('2d');

        pageCtx.fillStyle = bgColor;
        pageCtx.fillRect(0, 0, pageCanvas.width, slicePxHeight);
        pageCtx.drawImage(
          menuCanvas,
          0, yOffset, menuCanvas.width, slicePxHeight,
          0, 0, menuCanvas.width, slicePxHeight
        );

        const sliceImgData = pageCanvas.toDataURL('image/png');
        const sliceMmHeight = slicePxHeight / pxPerMm;

        pdf.addImage(
          sliceImgData,
          'PNG',
          pdfMargin,
          pdfMargin,
          printableWidth,
          sliceMmHeight
        );

        yOffset += slicePxHeight;
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

  const currentYearRates = selectedData ? selectedData[selectedYear] : null;
  const barChartData = labels.map((label, i) => {
    let rawVal = null;
    if (Array.isArray(currentYearRates)) {
      rawVal = currentYearRates[i];
    } else if (currentYearRates && typeof currentYearRates === 'object') {
      const keys = Object.keys(currentYearRates);
      rawVal = currentYearRates[keys[i]] !== undefined ? currentYearRates[keys[i]] : null;
    }
    const numVal = (rawVal !== null && rawVal !== undefined && !isNaN(Number(rawVal))) ? parseFloat(rawVal) : null;
    return {
      group: label,
      value: numVal,
    };
  });

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