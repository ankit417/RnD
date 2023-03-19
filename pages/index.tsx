import Head from 'next/head';
import { Launches } from 'components/launches/launches.component';

import styles from 'styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX - Launches</title>
        <meta name="description" content="Top 10 latest SpaceX launch data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['main']}>
        <h1>SpaceX - Latest Launches</h1>
        <Launches data-testid="launch-card" />
      </main>
    </div>
  );
}
