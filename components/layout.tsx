import React from 'react';
import Head from 'next/head';

import styles from './layout.module.scss';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content="fill it" />
      </Head>
      <header />
      <main>{children}</main>
    </div>
  );
}
