import Head from "next/head";
import styles from "../styles/Home.module.css";
import data from "../data/data_simplified.json";
import ParalellCoordinates from "../charts/ParalellCoordinates";

export default function Parallel() {
  console.log(`Show data fetched. Count: ${data.length}`);

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

      <ParalellCoordinates data={data}/>
    </div>
  );
}

