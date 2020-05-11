import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ErrorPageMessage } from '../components/ErrorPageMessage/ErrorPageMessage';

function Error({ statusCode }) {
  return (
    <p>
      <Layout>
        <ErrorPageMessage
          message={
            statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'
          }
        />
      </Layout>
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = (res && res.statusCode) || (err && err.statusCode) || 404;
  return { statusCode };
};

export default Error;
