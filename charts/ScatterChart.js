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

export default function ScatterChart({ data }) {
  const chartEl = useRef(null);
  const [current, setCurrent] = useState();

  useEffect(() => {
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
      .attr("r", (d) => z(d[zKey]));

    d3.selectAll("circle").on("click", function (event, item) {
      // console.log("Clicked circle: ", i, dataRow);
      // window._itemData = d;
      // setCurrentData(d);
      console.log(item);
      setCurrent(item);
    });

    // Add x axis label
    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .call((g) => g.select(".domain").remove())
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
        .call((g) => g.select(".domain").remove())
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
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chart} ref={chartEl} />
      <div className={styles.info}>
        {current ? (
          <div className={styles.item}>
            <h2>Student: {current.alias}</h2>
            <p>Major: {capitalize(current.major)}</p>
            <p>Expectations: {current["course_expectations"]}</p>
            <SkillDisplay
              name="Design Skill"
              value={current["design_skill"]}
              diff={current["design_skill_diff"]}
            />
            <SkillDisplay
              name="Technical Skill"
              value={current["technical_skill"]}
              diff={current["technical_skill_diff"]}
            />
            <SkillDisplay
              name="Teamwork Skill"
              value={current["teamwork_skill"]}
              diff={current["teamwork_skill_diff"]}
            />
          </div>
        ) : (
          <p>
            Click on one of the datapoints to see information about that student
          </p>
        )}
      </div>
    </div>
  );
}

function SkillDisplay({ name, value, diff }) {
  const style = diff < 0 ? styles.negative : styles.positive;

  return (
    <p>
      {name}: <span className={style}>{value.toPrecision(2)}</span>
    </p>
  );
}

function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
