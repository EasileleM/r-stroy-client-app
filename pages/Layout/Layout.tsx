import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import styles from './Layout.module.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export function Layout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Р-cтрой</title>
          <meta name="description" content="fill it" />
        </Head>

        <Header />

        <main className={styles.main}>{children}</main>

        <Footer />
      </div>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        newestOnTop
      />
    </>
  );
}
