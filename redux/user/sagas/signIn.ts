import { call } from 'redux-saga/effects';
import { apiService } from '../../../services/APIService';
import { loadCurrentUser } from './loadCurrentUser';
import { SignInData } from '../../../interfaces/SignInData';

export function* signIn(data: SignInData) {
  yield call(apiService.signIn, data);

  yield call(loadCurrentUser);
}