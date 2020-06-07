import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import styles from './Layout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Р-cтрой</title>
        <meta name="description" content="fill it" />
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.main__content}>
            {children}
          </div>
        </main>
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
