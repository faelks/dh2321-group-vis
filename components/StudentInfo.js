import styles from "../styles/StudentInfo.module.scss";
import { Pill } from "./Pill";

export function StudentInfo({
  studentData,
  addToGroup,
  averages,
  group,
  removeFromGroup,
}) {
  const d = studentData || {};
  const inGroup = group.includes(d.alias);

  function handleGroupAction() {
    if (inGroup) {
      removeFromGroup(d.alias);
    } else {
      addToGroup(d.alias);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.headerText}>
            Student: {d.alias || "None - Select a student to get started"}{" "}
            {d.major ? `- ${d.major}` : ""}
          </p>
          {studentData && (
            <button className={styles.actionButton} onClick={handleGroupAction}>
              {inGroup ? "Remove from Group" : "Add to Group"}
            </button>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.columnBig}>
            <p>Hobbies: {d.hobbies}</p>
            <p>Expectations: {d.course_expectations}</p>
            <p>In 5 years: {d.in_5_years}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.columnSmall}>
            <p>Social Channel Usage</p>
            <p>KTH Canvas: {d.kth_canvas_usage}/3</p>
            <p>KTH Social: {d.kth_social_usage}/3</p>
            <p>Facebook: {d.facebook_usage}/3</p>
          </div>
        </div>
      </div>
      {studentData && (
        <div className={styles.pills}>
          <Pill
            label="Technical"
            value={d.technical_skill}
            average={averages.technical_skill}
          />
          <Pill
            label="Design"
            value={d.design_skill}
            average={averages.design_skill}
          />
          <Pill
            label="Teamwork"
            value={d.teamwork_skill}
            average={averages.teamwork_skill}
          />
        </div>
      )}
    </>
  );
}
