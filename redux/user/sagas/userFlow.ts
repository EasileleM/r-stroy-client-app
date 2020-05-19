import { call } from 'redux-saga/effects';
import { userAuthorization } from './userAuthorization';
import { loadCurrentUser } from './loadCurrentUser';
import { logout } from './logout';

export function* userFlow() {
  const isGuest = yield call(loadCurrentUser);
  while(true) {
    if (isGuest) {
      yield call(userAuthorization);
    }
    yield call(logout);
  }
}