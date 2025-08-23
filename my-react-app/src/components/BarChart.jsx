import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { labels, generalColours } from '../config/config.js';
import PropTypes from 'prop-types';

const BarChart = ({ 
  data, 
  selectedYear,
  selectedRegion,
  width = 350,
  height = 180,
  labels: propLabels = labels,
  dataType,
}) => {
  const svgRef = useRef();
  const margin = { top: 50, right: 20, bottom: 50, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const config = {
    ETC: { nameProperty: 'ETC' },
    DEPARTMENTS: { nameProperty: 'DPTO_CNMBR' },
  };

  const wrapText = (text, maxWidth, fontSize) => {
    if (!text || typeof text !== 'string') {
      return ['Colombia']; // Fallback to a single line with 'Colombia'
    }
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const testWidth = testLine.length * fontSize * 0.6;
      if (testWidth < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    return lines;
  };

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleBand()
      .range([0, chartWidth])
      .padding(0.4)
      .domain(propLabels);

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "8px");

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);

    // Horizontal grid lines
    const yTicks = y.ticks(5);
    const yGridValues = [0, 20, 40, 60, 80, 100];
    g.selectAll(".grid-line")
      .data(yTicks)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "#d3d3d3")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4");

    // Y-axis values
    g.selectAll(".y-label")
      .data(yGridValues)
      .enter()
      .append("text")
      .attr("class", "y-label")
      .attr("x", -10)
      .attr("y", d => y(d) + 3)
      .attr("text-anchor", "end")
      .style("font-size", "8px")
      .style("font-family", "'Poppins', sans-serif")
      .text(d => d);

    // Title: Region name
    const regionText = selectedRegion 
      ? selectedRegion.properties[config[dataType].nameProperty]: 'Colombia';
    const deptFontSize = 14;
    const maxTitleWidth = chartWidth - 20;
    const regionLines = wrapText(regionText, maxTitleWidth, deptFontSize);

    const title = g.append("text")
      .attr("x", chartWidth / 2)
      .attr("y", -margin.top + 15)
      .attr("text-anchor", "middle")
      .style("font-family", "'Poppins', sans-serif");

    regionLines.forEach((line, i) => {
      title.append("tspan")
        .attr("x", chartWidth / 2)
        .attr("dy", i === 0 ? 0 : 12)
        .style("font-size", `${deptFontSize}px`)
        .style("font-weight", "600")
        .text(line);
    });

    // Title: Year
    title.append("tspan")
      .attr("x", chartWidth / 2)
      .attr("dy", regionLines.length > 1 ? 14 : 12)
      .style("font-size", "10px")
      .style("font-weight", "400")
      .text(selectedYear);

    // Bars
    const bars = g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(propLabels[i]))
      .attr("y", chartHeight)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => generalColours[i % generalColours.length]);

    // Animate bars
    bars.transition()
      .duration(1000)
      .attr("y", d => y(d.value))
      .attr("height", d => chartHeight - y(d.value));

    // Add value labels
    g.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d, i) => x(propLabels[i]) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 3)
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .style("opacity", 0)
      .text(d => `${d.value}%`)
      .transition()
      .duration(1000)
      .style("opacity", 1);

  }, [data, selectedYear, selectedRegion, width, height, propLabels, dataType]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
    />
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedRegion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      properties: PropTypes.shape({
        CODIGO_ETC: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        DPTO_CCDGO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ETC: PropTypes.string,
        DPTO_CNMBR: PropTypes.string,
      }),
    }),
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  labels: PropTypes.array,
  dataType: PropTypes.oneOf(['ETC', 'DEPARTMENTS']).isRequired,
};


export default BarChart;