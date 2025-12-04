import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import PropTypes from 'prop-types';
import { MdMyLocation } from "react-icons/md";
import { HiOutlineZoomOut, HiOutlineZoomIn } from "react-icons/hi";
import { ZoomIn, ZoomOut, LocateFixed } from 'lucide-react';
import TransparentWindow from './TransparentWindow';
import { labels, generalColours, generalIDEColours, availabilityColours, accessibilityColours, acceptabilityColours, adaptabilityColours } from '../config/config.js';
import { COLOMBIA_DEPARTMENTS_MAP_JSON_DATA, ETC_MAP_2025_JSON_DATA, WORLD_MAP_JSON_DATA } from '../config/configURLDataSource.js';
import WebpageContent from '../config/WebpageContent';

const D3Map = ({
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

  // Define base dimensions for the map coordinate system
  const WIDTH = 800;
  const HEIGHT = 600;

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
      .translate([WIDTH / 2, HEIGHT / 2]);

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

    const resetZoom = () => {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
      activeRef.current = null;
      onRegionClick(null, countryData);
      setWindowText(WebpageContent.transparent_window_label);
      d3.selectAll("path.departments").classed("active", false);
      tooltip.transition().duration(500).style("opacity", 0);
    };

    svg.on("click", function (event) {
      if (event.target === this) {
        resetZoom();
      }
    });

    const defs = svg.append("defs");
    defs.append("pattern")
      .attr("id", "diagonal-hatch")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 4)
      .attr("height", 8)
      .attr("patternTransform", "rotate(45)")
      .append("line")
      .attr("class", "map-hatch-line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 8)
      .attr("stroke-width", 1);

    const backgroundMapGroup = g.append("g").attr("class", "background-map");

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
        .style("pointer-events", "none");

      g.selectAll("path.departments")
        .data(topojson.feature(data, data.objects[config[dataType].topojsonObject]).features)
        .enter()
        .append("path")
        .attr("class", "departments")
        .attr("data-dept-id", d => d.properties[config[dataType].idProperty])
        .attr("d", path)
        .on("mouseover", function (event, d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);

          const deptID = Number(d.properties[config[dataType].idProperty]);
          const rates = dataIDE.get(deptID);
          const yearData = rates ? rates[selectedYear] : null;
          const value = yearData ? Object.values(yearData)[buttonIndex] : "No data";
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
        .on("mousemove", function (event) {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .on("click", function (event, d) {
          event.stopPropagation();

          const deptID = Number(d.properties[config[dataType].idProperty]);
          const rates = dataIDE.get(deptID) || countryData;

          if (activeRef.current === this) {
            resetZoom();
            d3.select(this).classed("active", false);
            setWindowText(WebpageContent.transparent_window_label);
            return;
          }

          if (activeRef.current) {
            d3.select(activeRef.current).classed("active", false);
          }

          activeRef.current = this;
          d3.select(this).classed("active", true);

          const bounds = pathRef.current.bounds(d);
          const dx = bounds[1][0] - bounds[0][0];
          const dy = bounds[1][1] - bounds[0][1];
          const x = (bounds[0][0] + bounds[1][0]) / 2;
          const y = (bounds[0][1] + bounds[1][1]) / 2;
          const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / WIDTH || 0.1, dy / HEIGHT || 0.1)));
          const translate = [WIDTH / 2 - scale * x, HEIGHT / 2 - scale * y];

          svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

          onRegionClick(d, rates);
          setWindowText(`Región: ${d.properties[config[dataType].nameProperty]}`);

          const yearData = rates ? rates[selectedYear] : null;
          const value = yearData ? Object.values(yearData)[buttonIndex] : "No data";
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
  }, [dataType]);

  useEffect(() => {
    if (!gRef.current || !tooltipRef.current) return;

    const g = d3.select(gRef.current);
    const color = d3.scaleQuantize()
      .domain([0, 100])
      .range(selectedColours);

    g.selectAll("path.departments")
      .each(function (d) {
        const deptID = Number(d.properties[config[dataType].idProperty]);
        const rates = dataIDE.get(deptID);
        const path = d3.select(this);

        const yearData = rates ? rates[selectedYear] : null;
        const colorValue = yearData ? Object.values(yearData)[buttonIndex] : 0;
        path.transition()
          .duration(500)
          .attr("fill", yearData ? color(colorValue) : "white");

        path.on("mouseover", function (event) {
          tooltipRef.current.transition()
            .duration(200)
            .style("opacity", 0.9);

          // Recalculate yearData inside the event handler to get fresh data
          const currentYearData = rates ? rates[selectedYear] : null;
          const value = currentYearData ? Object.values(currentYearData)[buttonIndex] : "No data";
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
          .on("mousemove", function (event) {
            tooltipRef.current
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function () {
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
          .each(function (d) {
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

    svg.transition()
      .duration(750)
      .call(zoomRef.current.transform, d3.zoomIdentity);

    g.style("stroke-width", "1.5px");

    activeRef.current = null;
    onRegionClick(null, countryData);
    d3.selectAll("path.departments").classed("active", false);
    tooltipRef.current.transition().duration(500).style("opacity", 0);
  };

  const zoomIn = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition()
      .duration(750)
      .call(zoomRef.current.scaleBy, 1.5);
  };

  const zoomOut = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition()
      .duration(750)
      .call(zoomRef.current.scaleBy, 0.67);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isLoading && (
        <div className="map-overlay loading">
          <div>Cargando mapa...</div>
        </div>
      )}

      {mapError && (
        <div className="map-overlay error">
          <div>Error al cargar el mapa:</div>
          <div style={{ fontSize: '12px', marginTop: '5px' }}>{mapError}</div>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="choropleth"
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease',
          width: '100%',
          height: 'auto',
          display: 'block'
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
        <LocateFixed size={22} />
      </button>
      <button
        onClick={zoomIn}
        className="map-button zoom-in-button"
        title="Zoom In"
      >
        <ZoomIn size={22} />
      </button>
      <button
        onClick={zoomOut}
        className="map-button zoom-out-button"
        title="Zoom Out"
      >
        <ZoomOut size={22} />
      </button>
    </div>

  );
};


D3Map.propTypes = {
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  buttonIndex: PropTypes.number.isRequired,
  dataIDE: PropTypes.instanceOf(Map).isRequired,
  countryData: PropTypes.object.isRequired,
  onRegionClick: PropTypes.func.isRequired,
  dataType: PropTypes.oneOf(['ETC', 'DEPARTMENTS']).isRequired,
};

export default D3Map;
