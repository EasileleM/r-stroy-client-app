import { call } from 'redux-saga/effects';
import { loadCurrentUser } from './loadCurrentUser';
import { SignInData } from '../../../../interfaces/SignInData';
import { userApiService } from '../../../../services/userApiService';

export function* signIn(data: SignInData) {
  // TODO handle error 403 - bad password or login
  yield call(userApiService.signIn, data);

  yield call(loadCurrentUser);
}