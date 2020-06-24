import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout/Layout';
import { NOT_FOUND_URL } from '../../../contants/const';
import { userApiService } from '../../../services/userApiService';

export interface ActivateUserPageProps {
  isSuccessful: boolean
}
export default function ActivateUserPage({
  isSuccessful
}: ActivateUserPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isSuccessful) {
      router.push(NOT_FOUND_URL);
    }
  }, [isSuccessful]);
  
  return (
    <Layout>
      Почта успешно подтверждена!
    </Layout>
  );
}

export async function getServerSideProps({ params: { uuid } }) {
  let isSuccessful = true;
  try {
    await userApiService.activateUser(uuid);
  } catch (e) {
    if (e.response.status === 404) {
      isSuccessful = false;
    }  else {
      throw e;
    }
  }

  return {
    props: {
      isSuccessful
    }
  };
}