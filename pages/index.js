import Head from "next/head";
import styles from "../styles/Home.module.css";
import SampleChart from "../charts/SampleChart";

export default function Home() {
  const dataset = [100, 200, 300, 400, 500];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1>DH2320 - Group Visualisation</h1>
        <p>Felix Gudéhn, Zezhe Huang, Xinyi Wang</p>
      </div>

      <SampleChart data={dataset} />
      <p className={styles.caption}>
        Some chart that visualises the group form responses
      </p>
    </div>
  );
}
