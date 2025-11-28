import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { years } from '../config/config.js';
import PropTypes from 'prop-types';

const LineChart = ({
    selectedData,
    selectedRegion,
    selectedIndex,
    width = 350,
    height = 380,
    dataType,
}) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const [chartWidth, setChartWidth] = useState(width);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                setChartWidth(width);
            }
        });

        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const margin = { top: 50, right: 20, bottom: 50, left: 40 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const config = {
        ETC: { nameProperty: 'ETC' },
        DEPARTMENTS: { nameProperty: 'DPTO_CNMBR' },
    };

    const wrapText = (text, maxWidth, fontSize) => {
        if (!text || typeof text !== 'string') {
            return ['Colombia'];
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
        if (!svgRef.current || !selectedData) return;

        // Prepare data: extract values for the selected dimension across all years
        const lineData = years.map(year => {
            const yearData = selectedData[year];
            if (!yearData) return { year, value: null };

            const values = Object.values(yearData);
            const value = values[selectedIndex] !== undefined ? values[selectedIndex] : null;

            return { year, value };
        }).filter(d => d.value !== null);

        if (lineData.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis (years)
        const x = d3.scaleLinear()
            .domain(d3.extent(years))
            .range([0, innerWidth]);

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(years.length))
            .selectAll("text")
            .style("font-size", "8px")
            .style("fill", "var(--chart-text-color)");

        // Y scale
        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);

        // Horizontal grid lines
        const yGridValues = [0, 20, 40, 60, 80, 100];
        g.selectAll(".grid-line")
            .data(yGridValues)
            .enter()
            .append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("x2", innerWidth)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))
            .attr("stroke", "var(--chart-grid-color)")
            .attr("stroke-width", 0.2);

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
            .style("fill", "var(--chart-text-color)")
            .text(d => d);

        // Title: Region name
        const regionText = selectedRegion
            ? selectedRegion.properties[config[dataType].nameProperty] : 'Colombia';
        const deptFontSize = 14;
        const maxTitleWidth = innerWidth - 20;
        const regionLines = wrapText(regionText, maxTitleWidth, deptFontSize);

        const title = g.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", -margin.top + 15)
            .attr("text-anchor", "middle")
            .style("font-family", "'Poppins', sans-serif")
            .style("fill", "var(--chart-text-color)");

        regionLines.forEach((line, i) => {
            title.append("tspan")
                .attr("x", innerWidth / 2)
                .attr("dy", i === 0 ? 0 : 12)
                .style("font-size", `${deptFontSize}px`)
                .style("font-weight", "600")
                .text(line);
        });

        // Title: Dimension label
        const dimensionLabels = ["IDE General", "Disponibilidad", "Accesibilidad", "Adaptabilidad", "Aceptabilidad"];
        title.append("tspan")
            .attr("x", innerWidth / 2)
            .attr("dy", regionLines.length > 1 ? 14 : 12)
            .style("font-size", "10px")
            .style("font-weight", "400")
            .text(dimensionLabels[selectedIndex]);

        // Line generator
        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        // Draw line path
        const path = g.append("path")
            .datum(lineData)
            .attr("fill", "none")
            .attr("stroke", `var(--chart-bar-${selectedIndex % 5})`)
            .attr("stroke-width", 2)
            .attr("d", line);

        // Animate line drawing
        const totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        // Add dots
        const dots = g.selectAll(".dot")
            .data(lineData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.value))
            .attr("r", 0)
            .attr("fill", `var(--chart-bar-${selectedIndex % 5})`)
            .attr("stroke", "var(--component-bg)")
            .attr("stroke-width", 2);

        // Animate dots
        dots.transition()
            .delay(1000)
            .duration(300)
            .attr("r", 4);

        // Add value labels
        g.selectAll(".value-label")
            .data(lineData)
            .enter()
            .append("text")
            .attr("class", "value-label")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.value) - 8)
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .style("opacity", 0)
            .style("fill", "var(--chart-text-color)")
            .text(d => `${d.value}%`)
            .transition()
            .delay(1300)
            .duration(300)
            .style("opacity", 1);

    }, [selectedData, selectedRegion, selectedIndex, chartWidth, height, dataType]);

    return (
        <div ref={wrapperRef} style={{ width: '100%', height: height }}>
            <svg
                ref={svgRef}
                width={chartWidth}
                height={height}
            />
        </div>
    );
};

LineChart.propTypes = {
    selectedData: PropTypes.object,
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
    selectedIndex: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    dataType: PropTypes.oneOf(['ETC', 'DEPARTMENTS']).isRequired,
};

export default LineChart;
