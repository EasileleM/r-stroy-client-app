import React from 'react';
import Head from 'next/head';

import styles from './layout.module.scss';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>

      <Head>
        <title>Р-Строй</title>
        <meta name="description" content="fill it" />
      </Head>

      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />

    </div>
  );
}
