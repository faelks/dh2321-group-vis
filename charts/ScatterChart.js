import { useRef, useEffect, useState } from "react";
import styles from "../styles/ScatterChart.module.css";
import * as d3 from "d3";

const height = 450;
const width = 450;
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 40,
};
const xKey = "technical_skill";
const yKey = "design_skill";
const zKey = "teamwork_skill";
const colorKey = "major";

// Return opacity based on group selection & inclusion
function opacity(group, alias) {
  if (!group.length) {
    return 1;
  }
  return group.includes(alias) ? 1 : 0.5;
}

export default function ScatterChart({ data, onClick, group }) {
  const chartEl = useRef(null);

  useEffect(() => {
    d3.select("svg").remove();

    const x = d3
      .scaleLinear()
      .domain([0, 9])
      .range([margin.left, width - margin.right])
      .clamp(true);

    const y = d3
      .scaleLinear()
      .domain([0, 8])
      .range([height - margin.bottom, margin.top]);

    const z = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[zKey]))
      .range([3, 7])
      .clamp(true);

    const colorScale = d3
      .scaleOrdinal()
      .domain(d3.extent(data, (d) => d[colorKey]))
      .range(["#E44A48", "#F4CA51", "#40E672", "#2C66C8", "#7E33AF"]);

    const svg = d3
      .select(chartEl.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .property("value", []);

    const dot = svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d[xKey]))
      .attr("cy", (d) => y(d[yKey]))
      .attr("fill", (d) => colorScale(d[colorKey]))
      .attr("r", (d) => z(d[zKey]))
      .attr("opacity", (d) => opacity(group, d["alias"]));

    d3.selectAll("circle").on("click", function (event, item) {
      onClick(item);
    });

    // Add x axis label
    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .call((g) =>
          g
            .append("text")
            .attr("x", width - margin.right)
            .attr("y", -4)
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text(xKey)
        );
    svg.append("g").call(xAxis);

    // Add y axis label
    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(yKey)
        );
    svg.append("g").call(yAxis);
  }, [group]);

  return <div className={styles.chart} ref={chartEl} />;
}
