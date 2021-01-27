import Head from "next/head";
import { useState } from "react";

import styles from "../styles/Scatter.module.scss";
import ScatterChart from "../charts/ScatterChart";
import { StudentInfo } from "../components/StudentInfo";
import { GroupInfo } from "../components/GroupInfo";
import { getItemsByAlias } from "../utils/getters";
import { calculateAverages } from "../utils/calculateAverages";

import data from "../data/data_simplified.json";
import dataWithKey from "../data/data_with_key.json";

const dataAverages = calculateAverages(data);

export default function Scatter() {
  const [currentStudent, setCurrentStudent] = useState();
  const [group, setGroup] = useState([]);
  const [groupData, setGroupData] = useState();

  function handleOnClick(studentData) {
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

  function removeFromGroup(studentAlias) {
    if (!group.includes(studentAlias)) {
      return;
    }

    const newGroup = group.filter((a) => a !== studentAlias);
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
            group={group}
            studentData={currentStudent}
            addToGroup={addStudentToGroup}
            removeFromGroup={removeFromGroup}
            averages={dataAverages}
          />
          <GroupInfo
            group={group}
            data={data}
            averages={dataAverages}
            clear={clearGroup}
          />
        </div>
      </div>
    </div>
  );
}
