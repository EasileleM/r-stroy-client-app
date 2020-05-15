import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ErrorPageMessage } from '../components/ErrorPageMessage/ErrorPageMessage';

export default function ErrorPage() {
  return (
    <Layout>
      <ErrorPageMessage message="Что то пошло не так..." />
    </Layout>
  );
}
