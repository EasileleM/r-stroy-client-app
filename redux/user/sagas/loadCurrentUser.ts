import { call, fork, put } from 'redux-saga/effects';
import { localStorageService } from '../../../services/localStorageService';
import { mergeUsersData } from '../../../utils/mergeUsersData';
import { initUserAction } from '../actions/initUserAction';
import { User } from '../../../interfaces/User';
import { userApiService } from '../../../services/userApiService';
import { getFreshLocalUser } from '../../../utils/getFreshLocalUser';

export function* loadCurrentUser() {
  const remoteUser: User = yield call(userApiService.getUser);
  const isGuest = !remoteUser;

  const localUser: User = yield call(getFreshLocalUser);

  let user;
  if (!isGuest) {
    if (localUser) {
      user = mergeUsersData(remoteUser, localUser);
      if (localUser.favoritesProducts.length) {
        yield fork(userApiService.patchFavorites, user.favoritesProducts);
      }
      if (localUser.cartProducts.length) {
        yield fork(userApiService.patchCart, user.cartProducts);
      }
    } else {
      user = remoteUser;
    }

    localStorageService.deleteUser();
  } else {
    user = localUser || localStorageService.createUser();
  }

  user.isGuest = isGuest;

  yield put(initUserAction(user));

  return isGuest;
}
