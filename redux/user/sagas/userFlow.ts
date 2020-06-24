import { call, fork } from 'redux-saga/effects';
import { userAuthorization } from './userAuthorization';
import { loadCurrentUser } from './loadCurrentUser';
import { logout } from './logout';
import { watchUserUpdates } from './watchUserUpdates';

export function* userFlow() {
  let isGuest = yield call(loadCurrentUser);

  yield fork(watchUserUpdates);

  while(true) {
    if (isGuest) {
      yield call(userAuthorization);
      isGuest = false;
    }

    yield call(logout);
    isGuest = true;
  }
}