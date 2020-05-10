import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { AppProps } from 'next/app';

import { store as storeInstance } from '../redux/store';

import '../styles/global.scss';

export interface AppReduxProps extends AppProps {
  store: Store;
}

function App({ Component, pageProps, store }: AppReduxProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withRedux(() => storeInstance)(App);
