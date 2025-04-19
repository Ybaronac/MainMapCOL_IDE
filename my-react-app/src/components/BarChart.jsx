import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ 
  data, 
  selectedYear,
  selectedDepartment
}) => {
  const svgRef = useRef();
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.2)
      .domain(data.map(d => d.group));

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    g.append("g")
      .call(d3.axisLeft(y));

    // Title
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(selectedDepartment 
        ? `${selectedDepartment.properties.DPTO_CNMBR} - ${selectedYear}`
        : `Colombia - ${selectedYear}`);

    // Bars
    const bars = g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.group))
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

    // Animate bars
    bars.transition()
      .duration(1000)
      .attr("y", d => y(d.value))
      .attr("height", d => height - y(d.value));

    // Add value labels
    g.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.group) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("opacity", 0)
      .text(d => d.value + "%")
      .transition()
      .duration(1000)
      .style("opacity", 1);

  }, [data, selectedYear, selectedDepartment]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    />
  );
};

export default BarChart; 