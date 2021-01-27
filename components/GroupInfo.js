import styles from "../styles/GroupInfo.module.scss";
import RadarChart from "../charts/RadarChart";
import { useEffect, useState } from "react";
import { calculateAverages } from "../utils/calculateAverages";
import { getItemsByAlias } from "../utils/getters";

export function GroupInfo({ group, data, averages, clear }) {
  const [radarChartData, setRadarChartData] = useState();
  const [groupAverages, setGroupAverages] = useState(null);

  function handleClear() {
    clear();
    setGroupAverages(null);
  }

  useEffect(() => {
    const radarChartData = [averages];

    if (group.length) {
      const groupData = getItemsByAlias(data, group, false);
      const groupAverages = calculateAverages(groupData);
      radarChartData.push(groupAverages);
      setGroupAverages(groupAverages);
    }

    setRadarChartData(radarChartData);
  }, [group]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.headerText}>
            Group: {group.length ? group.join(", ") : "None"}{" "}
          </p>
          <button className={styles.clearButton} onClick={handleClear}>
            Clear Group
          </button>
        </div>
        {groupAverages && (
          <div className={styles.summary}>
            <p>Technical: {groupAverages.technical_skill.toPrecision(1)}</p>
            <p>Design: {groupAverages.design_skill.toPrecision(1)}</p>
            <p>Teamwork: {groupAverages.teamwork_skill.toPrecision(1)}</p>
          </div>
        )}

        <RadarChart data={radarChartData} />
      </div>
    </div>
  );
}
