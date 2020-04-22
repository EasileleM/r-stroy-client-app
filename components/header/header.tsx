import React from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a href='/' className={styles.logo}>
          Р-Строй
        </a>
      </Link>
      header
    </header>
  );
}
