import * as d3 from "d3";
import { useEffect } from "react";
import { RadarChartLib } from "./RadarChartLib";

const chartId = "radar-chart";
const chartSelector = `#${chartId}`;
const width = 325;
const height = 325;
const config = {
  w: width,
  h: height,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 180,
};

const keysToRemove = [
  "technical_skill",
  "design_skill",
  "teamwork_skill",
  "kth_social_usage",
  "kth_canvas_usage",
  "facebook_usage",
];

function transformData(data) {
  const result = [];
  for (const item of data) {
    const itemResult = [];
    for (const key in item) {
      if (!keysToRemove.includes(key)) {
        itemResult.push({
          axis: key,
          value: item[key],
        });
      }
    }
    result.push(itemResult);
  }
  return result;
}

export default function RadarChart({ data }) {
  if (!data) {
    return null;
  }

  useEffect(() => {
    d3.select(chartSelector).select("svg").remove();

    const transformedData = transformData(data);
    RadarChartLib.draw(chartSelector, transformedData, config);
  });

  return <div id={chartId} />;
}
