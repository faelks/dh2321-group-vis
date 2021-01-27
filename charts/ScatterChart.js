import { useRef, useEffect, useState } from "react";
import styles from "../styles/ScatterChart.module.css";
import * as d3 from "d3";
import { color } from "d3";

const height = 450;
const width = 450;
const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 30,
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

function addSizeLegend(svg) {
  const sizeLegend = svg
    .selectAll(".size-legend")
    .data([2, 4, 7, 10])
    .enter()
    .append("g")
    .attr("class", "size-legend");

  sizeLegend
    .append("circle")
    .attr("cx", 52)
    .attr("cy", (d, i) => 110 + 15 * i)
    .attr("r", (d) => z(d))
    .style("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-width", 2.5);

  sizeLegend
    .append("text")
    .attr("font-size", "7px")
    .attr("fill", "gray")
    .attr("x", 45)
    .attr("y", 100)
    .text("teamwork_skill");

  sizeLegend
    .append("text")
    .attr("font-size", "7px")
    .attr("fill", "gray")
    .attr("x", 62)
    .attr("y", (_d, i) => 113 + 15 * i)
    .text((d) => d);
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
      .range([2, 5])
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
      .attr("stroke", (d) => colorScale(d[colorKey]))
      .attr("stroke-width", 2.5)
      .attr("fill", "none")
      .attr("r", (d) => z(d[zKey]))
      .attr("opacity", (d) => opacity(group, d["alias"]));

    d3.selectAll("circle").on("click", function (event, item) {
      onClick(item);
    });

    // Create legend
    var legend = svg
      .selectAll(".legend")
      .data(colorScale.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 5 + ")";
      });

    legend
      .append("circle")
      .attr("cx", 50)
      .attr("cy", function (d, i) {
        return 45 + i * 5;
      })
      .attr("r", 2.5)
      .style("fill", function (d) {
        return colorScale(d);
      });

    legend
      .append("text")
      .attr("font-size", "7px")
      .attr("x", 55)
      .attr("y", function (d, i) {
        return 47 + i * 5;
      })
      .style("fill", function (d) {
        return colorScale(d);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left");

    addSizeLegend(svg);

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

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <p>Distribution of student design, technical and teamwork skills</p>
        <div ref={chartEl} />
      </div>
    </div>
  );
}
