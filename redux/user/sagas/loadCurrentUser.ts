import { call, fork, put } from 'redux-saga/effects';
import { User } from '../../../interfaces/User';
import { apiService } from '../../../services/APIService';
import { localStorageService } from '../../../services/localStorageService';
import { mergeUsersData } from '../../../utils/mergeUsersData';
import { initUserAction } from '../actions/initUserAction';

export function* loadCurrentUser() {
  const remoteUser: User = yield call(apiService.getUser);
  const isGuest = !remoteUser;

  const localUser = localStorageService.getUser();

  let user;
  if (isGuest) {
    user = localUser || localStorageService.createUser();
  } else {
    if (localUser) {
      user = mergeUsersData(remoteUser, localUser);
      yield fork(apiService.patchUser, user);
    } else {
      user = remoteUser;
    }

    localStorageService.deleteUser();
  }

  yield put(initUserAction(user));

  return isGuest;
}