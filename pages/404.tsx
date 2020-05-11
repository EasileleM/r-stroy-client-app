import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ErrorPageMessage } from '../components/ErrorPageMessage/ErrorPageMessage';

export default function Custom404() {
  return (
    <Layout>
      <ErrorPageMessage message="Кажется вы перешли на несуществующую страницу" />
    </Layout>
  );
}
