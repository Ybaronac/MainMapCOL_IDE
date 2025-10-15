import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import PropTypes from 'prop-types';
import { MdMyLocation } from "react-icons/md";
import { HiOutlineZoomOut, HiOutlineZoomIn  } from "react-icons/hi";
import TransparentWindow from './TransparentWindow';
import '../styles/D3Map.css';
import {labels, generalColours, generalIDEColours, availabilityColours,accessibilityColours,acceptabilityColours,adaptabilityColours } from '../config/config.js';
import { COLOMBIA_DEPARTMENTS_MAP_JSON_DATA, ETC_MAP_2025_JSON_DATA,WORLD_MAP_JSON_DATA} from '../config/configURLDataSource.js';
import WebpageContent from '../config/WebpageContent';

const D3Map = ({ 
    width = 800, 
    height = 600, 
    selectedYear, 
    buttonIndex, 
    dataIDE, 
    countryData, 
    onRegionClick,
    dataType
  }) => {
    const svgRef = useRef();
    const gRef = useRef();
    const projectionRef = useRef();
    const pathRef = useRef();
    const tooltipRef = useRef();
    const activeRef = useRef(null);
    const zoomRef = useRef(null);
    const [windowText, setWindowText] = useState(WebpageContent.transparent_window_label);
    const [isLoading, setIsLoading] = useState(true);
    const [mapError, setMapError] = useState(null);
    
    const config = {
      ETC: {
        url: ETC_MAP_2025_JSON_DATA,
        idProperty: 'CODIGO_ETC',
        nameProperty: 'ETC',
        topojsonObject: 'ETCS',
      },
      DEPARTMENTS: {
        url: COLOMBIA_DEPARTMENTS_MAP_JSON_DATA,
        idProperty: 'DPTO_CCDGO',
        nameProperty: 'DPTO_CNMBR',
        topojsonObject: 'departamentos',
      },
    };
    
    const colorSchemes = [
      generalIDEColours,
      availabilityColours,
      accessibilityColours,
      acceptabilityColours,
      adaptabilityColours
    ];
    const selectedColours = colorSchemes[buttonIndex] || generalIDEColours;
  
    useEffect(() => {
      if (!svgRef.current) return;
      const svg = d3.select(svgRef.current);
      const g = d3.select(gRef.current);
  
      // Create tooltip
      const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("z-index", "1000");
  
      tooltipRef.current = tooltip;
  
      const projection = d3.geoMercator()
        .scale(1500)
        .center([-74, 4.5])
        .translate([width / 2, height / 2]);
  
      const path = d3.geoPath().projection(projection);
  
      projectionRef.current = projection;
      pathRef.current = path;
  
      const zoom = d3.zoom()
        .scaleExtent([1, 50])
        .on("zoom", (event) => {
          g.style("stroke-width", 1.5 / event.transform.k + "px");
          g.attr("transform", event.transform);
        });
      zoomRef.current = zoom;
      svg.call(zoom);
  
      // Function to reset zoom to country view
      const resetZoom = () => {
        svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);
        activeRef.current = null;
        onRegionClick(null, countryData);
        setWindowText(WebpageContent.transparent_window_label);
        // Remove active class from all departments
        d3.selectAll("path.departments").classed("active", false);
        tooltip.transition().duration(500).style("opacity", 0);
      };
  
      // Add click handler for the background
      svg.on("click", function(event) {
        // Check if the click was on the background (not on a department)
        if (event.target === this) {
          resetZoom();
        }
      });
      
          // Define the diagonal line pattern
    const defs = svg.append("defs");
    defs.append("pattern")
      .attr("id", "diagonal-hatch")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 4)
      .attr("height", 8)
      .attr("patternTransform", "rotate(45)")
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 8)
      .attr("stroke", "#bdc3c7") 
      .attr("stroke-width", 1);

      const backgroundMapGroup = g.append("g").attr("class", "background-map");
  
      // Load and render map data
      setIsLoading(true);
      setMapError(null);
      
      Promise.all([
        d3.json(config[dataType].url),
        d3.json(WORLD_MAP_JSON_DATA)
      ]).then(([data, worldData]) => {
        if (!data || !worldData) {
          throw new Error('Failed to load map data');
        }
        
        backgroundMapGroup.selectAll("path.background-countries")
          .data(worldData.features)
          .enter()
          .append("path")
          .attr("class", "background-countries")
          .attr("d", path)
          .style("fill", "#d7dbdd")
          .style("fill", "url(#diagonal-hatch)")
          .style("stroke", "#ffffff")
          .style("stroke-width", 3)
          .style("pointer-events", "none");

          g.selectAll("path.departments")
            .data(topojson.feature(data, data.objects[config[dataType].topojsonObject]).features)
            .enter()
            .append("path")
            .attr("class", "departments")
            .attr("data-dept-id", d => d.properties[config[dataType].idProperty])
            .attr("d", path)
            .on("mouseover", function(event, d) {
              tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
              
              const deptID = Number(d.properties[config[dataType].idProperty]);
              const rates = dataIDE.get(deptID);
              const value = rates ? rates[selectedYear][buttonIndex] : "No data";
              const html = `
                  <table class="d3-tooltip-table">
                    <thead>
                      <tr>
                        <th colspan="2">${d.properties[config[dataType].nameProperty] || 'Sin departamento'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <svg width="16" height="16" viewBox="0 0 512 512" style="vertical-align: middle; margin-right: 5px;">
                            <rect x="48" y="48" width="416" height="416" rx="48" ry="48" fill="${generalColours[buttonIndex] || '#000'}" />
                          </svg>
                          ${labels[buttonIndex] || 'Sin label'}
                        </td>
                        <td>${value}%</td>
                      </tr>
                    </tbody>
                  </table>
                `;
              
              tooltip
                .html(html)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mousemove", function(event) {
              tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
              tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            })
            .on("click", function(event, d) {
              event.stopPropagation();
              
              const deptID = Number(d.properties[config[dataType].idProperty]);
              const rates = dataIDE.get(deptID) || countryData;

              // If clicking the same department, reset zoom and remove active state
              if (activeRef.current === this) {
                resetZoom();
                d3.select(this).classed("active", false);
                setWindowText(WebpageContent.transparent_window_label);
                return;
              }

              // Remove active class from previously selected department
              if (activeRef.current) {
                d3.select(activeRef.current).classed("active", false);
              }

              // Update active department
              activeRef.current = this;
              d3.select(this).classed("active", true);

              // Calculate zoom transform
              const bounds = pathRef.current.bounds(d);
              const dx = bounds[1][0] - bounds[0][0];
              const dy = bounds[1][1] - bounds[0][1];
              const x = (bounds[0][0] + bounds[1][0]) / 2;
              const y = (bounds[0][1] + bounds[1][1]) / 2;
              const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width || 0.1, dy / height || 0.1)));
              const translate = [width / 2 - scale * x, height / 2 - scale * y];

              // Apply zoom transform
              svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

              onRegionClick(d, rates);
                              setWindowText(`Región: ${d.properties[config[dataType].nameProperty]}`);

              // Show tooltip on click
              const value = rates ? rates[selectedYear][buttonIndex] : "No data";
              const html = `
              <table class="d3-tooltip-table">
                <thead>
                  <tr>
                    <th colspan="2">${d.properties[config[dataType].nameProperty] || 'Sin departamento'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <svg width="16" height="16" viewBox="0 0 512 512" style="vertical-align: middle; margin-right: 5px;">
                        <rect x="48" y="48" width="416" height="416" rx="48" ry="48" fill="${generalColours[buttonIndex] || '#000'}" />
                      </svg>
                      ${labels[buttonIndex] || 'Sin label'}
                    </td>
                    <td>${value}%</td>
                  </tr>
                </tbody>
              </table>
            `;
  
            tooltip
              .html(html)
              .style("opacity", 0.9)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
            });
  
          g.append("path")
            .datum(topojson.mesh(data, data.objects[config[dataType].topojsonObject], (a, b) => a !== b))
            .attr("class", "dept-borders")
            .attr("d", path);
          
          setIsLoading(false);
        }).catch(error => {
          console.error('Error al cargar los datos del mapa:', error);
          setMapError(error.message);
          setIsLoading(false);
        });
  
      return () => {
        tooltip.remove();
      };
    }, [width, height, dataType]);
  
    useEffect(() => {
      if (!gRef.current) return;
  
      const g = d3.select(gRef.current);
      const color = d3.scaleQuantize()
        .domain([0, 100])
        .range(selectedColours);
  
      g.selectAll("path.departments")
        .each(function(d) {
          const deptID = Number(d.properties[config[dataType].idProperty]);
          const rates = dataIDE.get(deptID);
          const path = d3.select(this);
          
          // Update fill color
          path.transition()
            .duration(500)
            .attr("fill", rates ? color(rates[selectedYear][buttonIndex]) : "white");

          // Reattach tooltip event handlers
          path.on("mouseover", function(event) {
            tooltipRef.current.transition()
              .duration(200)
              .style("opacity", 0.9);
            
            const value = rates ? rates[selectedYear][buttonIndex] : "No data";
            const html = `
                <table class="d3-tooltip-table">
                  <thead>
                    <tr>
                      <th colspan="2">${d.properties[config[dataType].nameProperty] || 'Sin departamento'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <svg width="16" height="16" viewBox="0 0 512 512" style="vertical-align: middle; margin-right: 5px;">
                          <rect x="48" y="48" width="416" height="416" rx="48" ry="48" fill="${generalColours[buttonIndex] || '#000'}" />
                        </svg>
                        ${labels[buttonIndex] || 'Sin label'}
                      </td>
                      <td>${value}%</td>
                    </tr>
                  </tbody>
                </table>
              `;
            
            tooltipRef.current
              .html(html)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mousemove", function(event) {
            tooltipRef.current
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function() {
            tooltipRef.current.transition()
              .duration(500)
              .style("opacity", 0);
          });
        });
    }, [selectedYear, buttonIndex, dataIDE, dataType]);

    // Asegurar que el mapa se actualice cuando se carguen los datos
    useEffect(() => {
      if (dataIDE.size > 0 && !isLoading) {
        // Forzar una actualización del mapa
        const g = d3.select(gRef.current);
        if (g && g.selectAll("path.departments").size() > 0) {
          g.selectAll("path.departments")
            .each(function(d) {
              const deptID = Number(d.properties[config[dataType].idProperty]);
              const rates = dataIDE.get(deptID);
              const path = d3.select(this);
              
              if (rates && rates[selectedYear]) {
                const color = d3.scaleQuantize()
                  .domain([0, 100])
                  .range(selectedColours);
                
                path.transition()
                  .duration(300)
                  .attr("fill", color(rates[selectedYear][buttonIndex]));
              }
            });
        }
      }
    }, [dataIDE, selectedYear, buttonIndex, dataType, isLoading]);
    
    const resetZoomExt = () => {
      if (!svgRef.current || !zoomRef.current) return;
      const svg = d3.select(svgRef.current);
      const g = d3.select(gRef.current);

      // Reset transform and stroke-width to initial state
      svg.transition()
          .duration(750)
          .call(zoomRef.current.transform, d3.zoomIdentity);
      
      g.style("stroke-width", "1.5px");

      activeRef.current = null;
              onRegionClick(null, countryData);
      d3.selectAll("path.departments").classed("active", false);
      tooltipRef.current.transition().duration(500).style("opacity", 0);
    };

    // Zoom In function
    const zoomIn = () => {
      if (!svgRef.current || !zoomRef.current) return;
      const svg = d3.select(svgRef.current);
      svg.transition()
          .duration(750)
          .call(zoomRef.current.scaleBy, 1.5);
    };
  
    // Zoom Out function
    const zoomOut = () => {
        if (!svgRef.current || !zoomRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.transition()
            .duration(750)
            .call(zoomRef.current.scaleBy, 0.67);
    };
  
    return (
      <div style={{ position: 'relative' }}>
        {isLoading && (
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <div>Cargando mapa...</div>
          </div>
        )}
        
        {mapError && (
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ff0000',
              color: '#ff0000',
              textAlign: 'center'
            }}
          >
            <div>Error al cargar el mapa:</div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>{mapError}</div>
          </div>
        )}
        
        <svg 
            ref={svgRef}
            width={width}
            height={height}
            className="choropleth"
            style={{ 
              backgroundColor: isLoading ? '#f5f5f5' : 'white',
              opacity: isLoading ? 0.5 : 1,
              transition: 'opacity 0.3s ease'
            }}
        >
            <g ref={gRef} />
        </svg>
            
            <TransparentWindow
              top={20}
              left={20}
              width={200}
              height={150}
              isInteractive={false}
              text={windowText}
            />

            <button
                onClick={resetZoomExt}
                className="map-button reset-button"
                title="Reiniciar posición"
            >
                <MdMyLocation size={20} />
            </button>
            <button
                onClick={zoomIn}
                className="map-button zoom-in-button"
                title="Zoom In"
            >
                <HiOutlineZoomIn size={20} />
            </button>
            <button
                onClick={zoomOut}
                className="map-button zoom-out-button"
                title="Zoom Out"
            >
                <HiOutlineZoomOut size={20} />
            </button>
        </div>
      
    );
  };  


D3Map.propTypes = {
width: PropTypes.number,
height: PropTypes.number,
selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
buttonIndex: PropTypes.number.isRequired,
dataIDE: PropTypes.instanceOf(Map).isRequired,
countryData: PropTypes.object.isRequired,
  onRegionClick: PropTypes.func.isRequired,
dataType: PropTypes.oneOf(['ETC', 'DEPARTMENTS']).isRequired,
};

export default D3Map;

