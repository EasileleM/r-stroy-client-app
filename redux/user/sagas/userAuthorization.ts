import { call, take } from 'redux-saga/effects';
import { loadCurrentUser } from './loadCurrentUser';
import { AUTHORIZE_USER } from '../types';

export function* userAuthorization() {
  yield take(AUTHORIZE_USER);
  yield call(loadCurrentUser);
}
