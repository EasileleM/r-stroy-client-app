import { call, fork, put } from 'redux-saga/effects';
import { localStorageService } from '../../../../services/localStorageService';
import { mergeUsersData } from '../../../../utils/mergeUsersData';
import { initUserAction } from '../../actions/initUserAction';
import { User } from '../../../../interfaces/User';
import { userApiService } from '../../../../services/userApiService';

export function* loadCurrentUser() {
  const remoteUser: User = yield call(userApiService.getUser);
  const isGuest = !remoteUser;

  const localUser = localStorageService.getUser();

  let user;
  if (!isGuest) {
    if (localUser) {
      user = mergeUsersData(remoteUser, localUser);
      // TODO handle if error appears
      yield fork(userApiService.patchUser, user);
    } else {
      user = remoteUser;
    }

    localStorageService.deleteUser();
  } else {
    user = localUser;
  }

  yield put(initUserAction(user));

  return isGuest;
}