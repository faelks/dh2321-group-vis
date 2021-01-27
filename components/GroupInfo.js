import styles from "../styles/GroupInfo.module.scss";
import RadarChart from "../charts/RadarChart";
import { useEffect, useState } from "react";
import { calculateAverages } from "../utils/calculateAverages";
import { getItemsByAlias } from "../utils/getters";

function findPreferredSocial(groupAverages) {
  const { kth_canvas_usage, kth_social_usage, facebook_usage } = groupAverages;
  console.log(kth_social_usage, kth_canvas_usage, facebook_usage);
  const maxValue = Math.max(...[
    kth_canvas_usage,
    kth_social_usage,
    facebook_usage,
  ]);
  console.log("Max: ", maxValue);
  switch (maxValue) {
    case kth_canvas_usage:
      return "KTH Canvas";
    case kth_social_usage:
      return "KTH Social";
    case facebook_usage:
      return "Facebook";
    default:
      return "Error";
  }
}

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
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <p>
              Technical:{" "}
              {groupAverages
                ? groupAverages.technical_skill.toPrecision(2)
                : "-"}
            </p>
          </div>
          <div className={styles.summaryItem}>
            <p>
              Design:{" "}
              {groupAverages ? groupAverages.design_skill.toPrecision(2) : "-"}
            </p>
          </div>
          <div className={styles.summaryItem}>
            <p>
              Teamwork:{" "}
              {groupAverages
                ? groupAverages.teamwork_skill.toPrecision(2)
                : "-"}
            </p>
          </div>
          <div className={styles.summaryItem}>
            <p>
              Preferred Social:{" "}
              {groupAverages ? findPreferredSocial(groupAverages) : "-"}
            </p>
          </div>
        </div>

        <RadarChart data={radarChartData} />
        <p className={styles.caption}>
          Radar graph of the group mean skill values compared to the student
          mean. The percentages of the levels are relative to the maximum value
          in the dataset for that skill.
        </p>
      </div>
    </div>
  );
}
