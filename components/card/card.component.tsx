import React from 'react';
import Image from 'next/image';
import moment from 'moment';

import styles from 'styles/components/card.module.css';

type CardProps = {
  launch: Api.Launch;
};

export const Card: React.FC<CardProps> = ({ launch }) => {
  const { links, name, date_utc, cores, payloads, success, failures } = launch;

  const coreSerial = cores[0]?.core.serial;
  const payloadInfo = `${payloads[0]?.id} - ${payloads[0]?.type}`;
  const failureReason = failures[0]?.reason;

  return (
    <div className={styles.card} data-testid="launch-card">
      <Image
        src={links.patch.small}
        className={styles['card-banner']}
        alt={`spaceX ${name} logo`}
        width="0"
        height="0"
        sizes="100vw"
        priority={true}
        style={{ width: '100%', height: 'auto' }}
      />

      <div className={styles['card-content']}>
        <div className={styles['card-name']} data-testid="launch-name">
          {name}
        </div>
        <div className={styles['card-date']} data-testid="launch-date">
          {moment(String(date_utc)).format('ddd, MMM Do YYYY, h:mm a')}
        </div>

        <div>
          <div className={styles['card-label']}>Core</div>
          {cores.length > 0 && (
            <div className={styles['card-core']} data-testid="launch-core">
              {coreSerial}
            </div>
          )}
        </div>
        <div>
          <div className={styles['card-label']}>Type</div>
          <div className={styles['card-id-type']} data-testid="payload-info">
            {payloadInfo}
          </div>
        </div>
        <div
          className={!!success ? styles['card-status-success'] : styles['card-status-failure']}
          data-testid="launch-status"
        >
          {!!success ? 'Success' : 'Failure'}
        </div>
      </div>

      {!!failureReason && !success && <div className={styles['card-footer']}>{failureReason}</div>}
    </div>
  );
};
