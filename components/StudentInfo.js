import styles from "../styles/StudentInfo.module.css";
import { capitalize } from "../utils/string";
import { useEffect } from "react";

function SkillDisplay({ name, value, diff }) {
  const style = diff < 0 ? styles.negative : styles.positive;

  return (
    <p>
      {name}: <span className={style}>{value.toPrecision(2)}</span>
    </p>
  );
}

export function StudentInfo({ studentData, addToGroup }) {
  return (
    <div className={styles.container}>
      {studentData ? (
        <>
          <div className={styles.header}>
            <h2>
              {studentData.alias} - {studentData.major}
            </h2>
          </div>
          <div className={styles.body}>
            <div className={styles.column}>
              <SkillDisplay
                name="Design"
                value={studentData["design_skill"]}
                diff={studentData["design_skill_diff"]}
              />
              <SkillDisplay
                name="Technical"
                value={studentData["technical_skill"]}
                diff={studentData["technical_skill_diff"]}
              />
              <SkillDisplay
                name="Teamwork"
                value={studentData["teamwork_skill"]}
                diff={studentData["teamwork_skill_diff"]}
              />
            </div>
            <div className={styles.column}>
              <p>Expectations: {studentData["course_expectations"]}</p>
            </div>
            <div className={styles.column}>
              <button onClick={() => addToGroup(studentData.alias)}>
                Add to Group
              </button>
            </div>
          </div>
        </>
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

function Placeholder() {
  return (
    <p>Click on one of the datapoints to see information about that student</p>
  );
}
