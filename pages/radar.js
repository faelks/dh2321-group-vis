import Head from "next/head";
import styles from "../styles/Home.module.css";
import data from "../data/data_with_key.json";
import avgData from "../data/average.json";
import RadarChart from '../charts/RadarChart';

export default function Radar() {
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

      <RadarChart data={data} avgData={avgData} />
    </div>
  );
}
