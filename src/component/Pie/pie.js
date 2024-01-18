import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 300;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie();
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = pie(data);

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .style('stroke-width', '3px');

    svg.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${d3.arc().centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data);

  }, [data]);

  return(
    <>
    <h1>Pie chart</h1>
     <svg ref={svgRef}></svg>;
    </>
  )
};

export default PieChart;
