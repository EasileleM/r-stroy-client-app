import React from 'react';

import styles from './ErrorPageMessage.module.scss';

export interface ErrorPageMessageProps {
  message: string;
}

export function ErrorPageMessage({ message }: ErrorPageMessageProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.message}>{message}</h1>
    </div>
  );
}
