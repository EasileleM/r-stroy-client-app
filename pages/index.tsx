import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout/Layout';
import { CATALOG_URL } from '../contants/const';

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push(CATALOG_URL);
  }, []);
  return <Layout>Work in progress</Layout>;
}
