import { useRef, useEffect } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear any previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create an SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create scales for x and y dimensions
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height, 0]);

    // Create x-axis and y-axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    // Create circles for each data point
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue");
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
