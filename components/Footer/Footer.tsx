import React from 'react';

import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; { new Date().getFullYear() }
          <span className={styles.logo}> Р-строй</span>
        </p>
      </div>
    </footer>
  );
}
