import styles from "../styles/GroupInfo.module.css";
import { getItemsByAlias } from "../utils/getters";

export function GroupInfo({ group, data, clear }) {
  function calculateGroupStats() {
    console.log(group);
    console.log(data);
  }

  return (
    <div className={styles.container}>
      {group.length ? <p>New Group: {group.join(",")}</p> : null}
      <button onClick={clear}>Clear Group</button>
      <button onClick={calculateGroupStats}>Calculate</button>
    </div>
  );
}
