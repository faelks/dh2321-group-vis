import { useRef, useEffect } from "react";
import styles from "../styles/SampleChart.module.css";
import * as d3 from "d3";

export default function SampleChart({ data }) {
  const chartEl = useRef(null);

  useEffect(() => {
    let size = 400;
    let svg = d3
      .select(chartEl.current)
      .append("svg")
      .attr("width", size)
      .attr("height", size);

    let rectWidth = 75;
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rectWidth + 5))
      .attr("y", (d) => size - d)
      .attr("width", rectWidth)
      .attr("height", (d) => d)
      .attr("fill", "red");
  }, []);

  return <div className={styles.chart} ref={chartEl} />;
}
