import { Fragment } from 'react';
import { Card } from 'components/card/card.component';
import { useLaunchData } from 'services/getLaunch.service';

import styles from 'styles/Home.module.css';

export const Launches = () => {
  const { launchData } = useLaunchData({ limit: 10 });

  if (!launchData?.docs || launchData.docs.length === 0) {
    return (
      <h2 className={styles['card-suspense']} data-testid="launch-card-loading">
        Loading...
      </h2>
    );
  }

  return (
    <div className={styles['cards-grid']}>
      {launchData.docs.map((doc) => (
        <Fragment key={doc.id}>
          <Card launch={doc} />
        </Fragment>
      ))}
    </div>
  );
};
