import React from 'react';
import Head from 'next/head';

import styles from './Layout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Р-cтрой</title>
        <meta name="description" content="fill it" />
      </Head>

      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
}
