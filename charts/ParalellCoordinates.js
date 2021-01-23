import { useRef, useEffect } from "react";
import styles from "../styles/ParallelCoordinates.module.css";
import * as d3 from "d3";

// Code sourced from https://observablehq.com/@d3/parallel-coordinates

const WIDTH = 800;
const FEATURE_HEIGHT = 60;
const KEYS = [
  "major",
  "info_vis_skill",
  "stats_skill",
  "maths_skill",
  "drawing_skill",
  "cg_skill",
  "code_repository_skill",
  "collaboration_skill",
  "communication_skill",
  "computer_skill",
  "hci_skill",
  "programming_skill",
  "user_experience_skill",
  "facebook_usage",
  "kth_canvas_usage",
  "kth_social_usage",
];
const MARGIN = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 10,
};
const Z_KEY = "major";

function processData(dataset) {
  const result = [];
  const majorCategoryMap = {
    "computer-science": 1,
    media: 2,
    "human-computer-interaction": 3,
    other: 4,
    double: 5,
  };
  for (const record of dataset) {
    record.major = majorCategoryMap[record.major];
    result.push(record);
  }
  return result;
}

export default function ParalellCoordinates({ data }) {
  const chartEl = useRef(null);

  useEffect(() => {
    const dataset = processData(data);

    console.log(dataset[0]);

    const height = KEYS.length * FEATURE_HEIGHT;
    let svg = d3
      .select(chartEl.current)
      .append("svg")
      .attr("viewBox", [0, 0, WIDTH, height]);

    // Define x coordinates for data
    const x = new Map(
      Array.from(KEYS, (key) => [
        key,
        d3.scaleLinear(
          d3.extent(dataset, (d) => d[key]),
          [MARGIN.left, WIDTH - MARGIN.right]
        ),
      ])
    );
    console.log(x);
    window.x = x;

    // Define y function that takes some data as input?
    const y = d3.scalePoint(KEYS, [MARGIN.top, height - MARGIN.bottom]);
    console.log(y);
    window.y = y;

    // Define z as a function that outputs the color of lines at (x,y) points
    const z = d3.scaleSequential(x.get(Z_KEY).domain(), (t) =>
      d3.interpolateBrBG(1 - t)
    );
    console.log(z);
    window.z = z;

    const line = d3
      .line()
      .defined(([, value]) => value != null)
      .x(([key, value]) => x.get(key)(value))
      .y(([key]) => y(key));

    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)
      .selectAll("path")
      .data(data.slice().sort((a, b) => d3.ascending(a[Z_KEY], b[Z_KEY])))
      .join("path")
      .attr("stroke", (d) => z(d[Z_KEY]))
      .attr("d", (d) => line(d3.cross(KEYS, [d], (key, d) => [key, d[key]])))
      .append("title")
      .text((d) => d.alias);

    svg
      .append("g")
      .selectAll("g")
      .data(KEYS)
      .join("g")
      .attr("transform", (d) => `translate(0,${y(d)})`)
      .each(function (d) {
        d3.select(this).call(d3.axisBottom(x.get(d)));
      })
      .call((g) =>
        g
          .append("text")
          .attr("x", MARGIN.left)
          .attr("y", -6)
          .attr("text-anchor", "start")
          .attr("fill", "currentColor")
          .text((d) => d)
      )
      .call((g) =>
        g
          .selectAll("text")
          .clone(true)
          .lower()
          .attr("fill", "none")
          .attr("stroke-width", 5)
          .attr("stroke-linejoin", "round")
          .attr("stroke", "white")
      );
  }, []);

  return <div className={styles.chart} ref={chartEl} />;
}
