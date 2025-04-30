import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { MdMyLocation } from "react-icons/md";
import { HiOutlineZoomOut, HiOutlineZoomIn  } from "react-icons/hi";
import '../styles/D3Map.css';

const D3Map = ({ 
    width = 800, 
    height = 600, 
    selectedYear, 
    buttonIndex, 
    dataIDE, 
    countryData, 
    onDepartmentClick 
  }) => {
    const svgRef = useRef();
    const gRef = useRef();
    const projectionRef = useRef();
    const pathRef = useRef();
    const tooltipRef = useRef();
    const activeRef = useRef(null);
    const zoomRef = useRef(null);
  
    // Define color schemes for different categories
    const mapColours = [
      d3.schemeBlues[9],
      d3.schemeGreens[9],
      d3.schemeOranges[9],
      d3.schemePurples[9],
      d3.schemeReds[9]
    ];
  
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
        .style("padding", "10px")
        .style("background", "rgba(0, 0, 0, 0.8)")
        .style("color", "white")
        .style("pointer-events", "none")
        .style("font-size", "14px")
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
        onDepartmentClick(null, countryData);
        // Remove active class from all departments
        d3.selectAll("path.departments").classed("active", false);
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
      Promise.all([
        d3.json("https://gist.githubusercontent.com/Ybaronac/e65e865cf1139b16ef6cd47d9f86346a/raw/Colombia_departamentos.json    "),
        d3.json("https://gist.githubusercontent.com/Ybaronac/ce02fcf1cd6d455ef585e2946117363e/raw/8a30de4e4753bd1a701caa08870df42dfd1e9bcd/worldMapData.json")
      ]).then(([data, worldData]) => {
          const countries = backgroundMapGroup.selectAll("path.background-countries")
          .data(worldData.features)
          .enter()
          .append("path")
          .attr("class", "background-countries")
          .attr("d", path)
          .style("fill", "##d7dbdd")
          .style("fill", "url(#diagonal-hatch)") // Light gray for background
          .style("stroke", "#ffffff")
          .style("stroke-width", 3)
          .style("pointer-events", "none");

          g.selectAll("path.departments")
            .data(topojson.feature(data, data.objects.departamentos).features)
            .enter()
            .append("path")
            .attr("class", "departments")
            .attr("data-dept-id", d => d.properties.DPTO_CCDGO)
            .attr("d", path)
            .on("mouseover", function(event, d) {
              tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
              
              const rates = dataIDE.get(Number(d.properties.DPTO_CCDGO));
              const value = rates ? rates[selectedYear][buttonIndex] : "No data";
              const html = `<div>
                <strong>${d.properties.DPTO_CNMBR}</strong><br/>
                ${value}%
              </div>`;
              
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
              
              const deptID = Number(d.properties.DPTO_CCDGO);
              const rates = dataIDE.get(deptID) || countryData;

              // If clicking the same department, reset zoom and remove active state
              if (activeRef.current === this) {
                resetZoom();
                d3.select(this).classed("active", false);
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

              onDepartmentClick(d, rates);
            });
  
          g.append("path")
            .datum(topojson.mesh(data, data.objects.departamentos, (a, b) => a !== b))
            .attr("class", "dept-borders")
            .attr("d", path);
        });
  
      return () => {
        tooltip.remove();
      };
    }, [width, height]);
  
    useEffect(() => {
      if (!gRef.current) return;
  
      const g = d3.select(gRef.current);
      const color = d3.scaleQuantize()
        .domain([0, 100])
        .range(mapColours[buttonIndex]);
  
      g.selectAll("path.departments")
        .each(function(d) {
          const rates = dataIDE.get(Number(d.properties.DPTO_CCDGO));
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
            const html = `<div>
              <strong>${d.properties.DPTO_CNMBR}</strong><br/>
              ${value}%
            </div>`;
            
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
    }, [selectedYear, buttonIndex, dataIDE]);
    
    const resetZoomExt = () => {
      if (!svgRef.current || !zoomRef.current) return;
      const svg = d3.select(svgRef.current);
      const g = d3.select(gRef.current);

      // Reset transform and stroke-width to initial state
      svg.transition()
          .duration(750)
          .call(zoomRef.current.transform, d3.zoomIdentity);
      
      g.style("stroke-width", "1.5px"); // Reset stroke-width to initial value

      activeRef.current = null;
      onDepartmentClick(null, countryData);
      d3.selectAll("path.departments").classed("active", false);
    };

    // Zoom In function
    const zoomIn = () => {
      if (!svgRef.current || !zoomRef.current) return;
      const svg = d3.select(svgRef.current);
      svg.transition()
          .duration(750)
          .call(zoomRef.current.scaleBy, 1.5); // Aumenta la escala en un factor de 1.5
    };
  
    // Zoom Out function
    const zoomOut = () => {
        if (!svgRef.current || !zoomRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.transition()
            .duration(750)
            .call(zoomRef.current.scaleBy, 0.67); // Reduce la escala en un factor de 0.67 (1/1.5)
    };
  
    return (
      <div style={{ position: 'relative' }}>
            <svg 
                ref={svgRef}
                width={width}
                height={height}
                className="choropleth"
            >
                <g ref={gRef} />
            </svg>
            
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

export default D3Map;

