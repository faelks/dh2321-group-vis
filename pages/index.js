import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Home() {
  const chartEl = useRef(null);
  const dataset = [100, 200, 300, 400, 500];

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
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rectWidth + 5))
      .attr("y", (d) => size - d)
      .attr("width", rectWidth)
      .attr("height", (d) => d)
      .attr("fill", "red");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1>DH2320 - Group Visualisation</h1>
        <p>Felix Gudéhn, Zezhe Huang, Xinyi Wang</p>
      </div>

      <div className={styles.chart} ref={chartEl} />
      <p className={styles.caption}>
        Some chart that visualises the group form responses
      </p>
    </div>
  );
}
