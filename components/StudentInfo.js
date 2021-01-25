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
  useEffect(() => {
    console.log("StudentInfo: ", studentData ? studentData.alias : "None");
  }, [studentData]);

  return (
    <div className={styles.container}>
      {studentData ? (
        <div className={styles.item}>
          <h2>Student: {studentData.alias}</h2>
          <p>Major: {capitalize(studentData.major)}</p>
          <p>Expectations: {studentData["course_expectations"]}</p>
          <SkillDisplay
            name="Design Skill"
            value={studentData["design_skill"]}
            diff={studentData["design_skill_diff"]}
          />
          <SkillDisplay
            name="Technical Skill"
            value={studentData["technical_skill"]}
            diff={studentData["technical_skill_diff"]}
          />
          <SkillDisplay
            name="Teamwork Skill"
            value={studentData["teamwork_skill"]}
            diff={studentData["teamwork_skill_diff"]}
          />
          <button onClick={() => addToGroup(studentData.alias)}>
            Add to Group
          </button>
        </div>
      ) : (
        <p>
          Click on one of the datapoints to see information about that student
        </p>
      )}
    </div>
  );
}
