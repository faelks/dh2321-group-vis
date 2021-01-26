import styles from "../styles/GroupInfo.module.css";
import RadarChart from "../charts/RadarChart";
import { useEffect, useState } from "react";
import { calculateAverages } from "../utils/calculateAverages";
import { getItemsByAlias } from "../utils/getters";

export function GroupInfo({ group, data, dataAverages, clear }) {
  const [radarChartData, setRadarChartData] = useState();

  useEffect(() => {
    const radarChartData = [dataAverages];

    if (group.length) {
      const groupData = getItemsByAlias(data, group, false);
      const groupAverages = calculateAverages(groupData);
      radarChartData.push(groupAverages);
    }

    setRadarChartData(radarChartData);
  }, [group]);

  return (
    <div className={styles.container}>
      {group.length ? <p>New Group: {group.join(",")}</p> : null}
      <button onClick={clear}>Clear Group</button>
      <RadarChart data={radarChartData} />
    </div>
  );
}
