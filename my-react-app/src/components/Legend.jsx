import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Legend = ({ 
  width = 700, 
  height = 50,
  buttonIndex
}) => {
  const svgRef = useRef();

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
    svg.selectAll("*").remove();

    const color = d3.scaleQuantize()
      .domain([0, 100])
      .range(mapColours[buttonIndex]);

    const x = d3.scaleLinear()
      .domain(d3.extent(color.domain()))
      .rangeRound([0, width - 40]);

    const legend = svg.append("g")
      .attr("transform", "translate(20,20)");

    const rects = legend
      .selectAll("rect.legend-rect")
      .data(color.range().map(d => color.invertExtent(d)));

    rects.enter()
      .append("rect")
      .attr("class", "legend-rect")
      .attr("height", 8)
      .merge(rects)
      .attr("x", d => x(d[0]))
      .attr("width", width - 40)
      .attr("fill", d => color(d[0]));

    const axis = d3
      .axisBottom(x)
      .tickSize(13)
      .tickFormat(d => d3.format(".0f")(d) + "%")
      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0]));

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