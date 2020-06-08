import React from 'react';
import { Layout } from '../components/Layout/Layout';
import OrdersList from '../components/OrdersList/OrdersList';

export default function OrdersPage() {
  return (
    <Layout>
      <OrdersList />
    </Layout>
  );
}
