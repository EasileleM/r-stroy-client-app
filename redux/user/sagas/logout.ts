import { call, take } from 'redux-saga/effects';
import { LOGOUT } from '../types';
import { apiService } from '../../../services/APIService';
import { loadCurrentUser } from './loadCurrentUser';

export function* logout() {
  yield take(LOGOUT);
  yield call(apiService.logout);
  yield call(loadCurrentUser);
}