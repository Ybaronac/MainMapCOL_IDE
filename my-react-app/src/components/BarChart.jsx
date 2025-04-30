import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ 
  data, 
  selectedYear,
  selectedDepartment,
  width = 350, // Set to 350px as requested
  height = 180, // Kept for vertical fit
  labels = ["General", "Disponibilidad", "Accesibilidad", "Adaptabilidad", "Aceptabilidad"]
}) => {
  const svgRef = useRef();
  const margin = { top: 20, right: 20, bottom: 50, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleBand()
      .range([0, chartWidth])
      .padding(0.4) // Increased padding to reduce bar width
      .domain(labels);

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "8px");

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);

    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "8px");

    // Title
    g.append("text")
      .attr("x", chartWidth / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(selectedDepartment 
        ? `${selectedDepartment.properties.DPTO_CNMBR} - ${selectedYear}`
        : `Colombia - ${selectedYear}`);

    // Bars
    const bars = g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(labels[i]))
      .attr("y", chartHeight)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

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
      .attr("x", (d, i) => x(labels[i]) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 3)
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .style("opacity", 0)
      .text(d => `${d.value}%`)
      .transition()
      .duration(1000)
      .style("opacity", 1);

  }, [data, selectedYear, selectedDepartment, width, height, labels]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
    />
  );
};

export default BarChart;