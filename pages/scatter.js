import Head from "next/head";
import styles from "../styles/Scatter.module.css";
import data from "../data/data_simplified.json";
import ScatterChart from "../charts/ScatterChart";
import { StudentInfo } from "../components/StudentInfo";
import { GroupInfo } from "../components/GroupInfo";
import { useState } from "react";
import { getItemsByAlias } from "../utils/getters";

export default function Scatter() {
  const [currentStudent, setCurrentStudent] = useState();
  const [group, setGroup] = useState([]);
  const [groupData, setGroupData] = useState();

  function handleOnClick(studentData) {
    console.log(studentData);
    setCurrentStudent(studentData);
  }

  function clearGroup() {
    setGroup([]);
  }

  function addStudentToGroup(studentAlias) {
    if (group.includes(studentAlias)) {
      return;
    }
    const newGroup = [...group, studentAlias];
    setGroup(newGroup);
    setGroupData(getItemsByAlias(data, newGroup));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DH2320 Group Vis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1>DH2320 - Group Visualisation</h1>
        <p>Felix Gudéhn, Zezhe Huang, Xinyi Wang</p>
      </div>

      <div className={styles.content}>
        <div className={styles.column}>
          <ScatterChart data={data} onClick={handleOnClick} group={group} />
        </div>
        <div className={styles.column}>
          <StudentInfo
            studentData={currentStudent}
            addToGroup={addStudentToGroup}
          />
          <GroupInfo group={group} data={groupData} clear={clearGroup} />
        </div>
      </div>
    </div>
  );
}
