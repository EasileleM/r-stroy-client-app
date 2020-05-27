import { call } from 'redux-saga/effects';
import { loadCurrentUser } from './loadCurrentUser';
import { SignUpData } from '../../../../interfaces/SignUpData';
import { userApiService } from '../../../../services/userApiService';

export function* signUp(data: SignUpData) {
  // TODO handle error like email is already user and etc
  yield call(userApiService.signUp, data);

  yield call(loadCurrentUser);
}