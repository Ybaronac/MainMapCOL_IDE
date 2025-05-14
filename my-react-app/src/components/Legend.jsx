import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {generalIDEColours, availabilityColours,accessibilityColours,acceptabilityColours,adaptabilityColours } from '../config/config.js';

const Legend = ({ 
  width = 700, 
  height = 50,
  buttonIndex
}) => {
  const svgRef = useRef();
  const colorSchemes = [
    generalIDEColours,
    availabilityColours,
    accessibilityColours,
    acceptabilityColours,
    adaptabilityColours
  ];

  const selectedColours = colorSchemes[buttonIndex] || '#616a6b'; 

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const color = d3.scaleQuantize()
      .domain([0, 100])
      .range(selectedColours);

    const x = d3.scaleLinear()
      .domain([0,100])
      .rangeRound([0, width - 40]);

    const legend = svg.append("g")
      .attr("transform", "translate(20,20)");

    const intervals = color.range().map(d => color.invertExtent(d));
    legend.selectAll("rect.legend-rect")
      .data(intervals)
      .enter()
      .append("rect")
      .attr("class", "legend-rect")
      .attr("x", d => x(d[0]))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("height", 8)
      .attr("fill", d => color(d[0]));

    const axis = d3
      .axisBottom(x)
      .tickSize(13)
      .tickFormat(d => d3.format(".0f")(d) + "%")
      .tickValues(d3.range(0, 101, 10));

    legend.append("g")
      .attr("class", "axis")
      .call(axis)
      .select(".domain")
      .remove();

  }, [width, height, buttonIndex]);

  return (
    <div>
      <p>IDE</p>
      <svg 
      ref={svgRef}
      width={width}
      height={height}
      />
      
    </div>
    
  );
};

export default Legend; 