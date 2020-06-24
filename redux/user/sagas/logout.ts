import { call, take } from 'redux-saga/effects';
import { LOGOUT } from '../types';
import { loadCurrentUser } from './loadCurrentUser';
import { userApiService } from '../../../services/userApiService';

export function* logout() {
  yield take(LOGOUT);
  yield call(userApiService.logout);
  yield call(loadCurrentUser);
}