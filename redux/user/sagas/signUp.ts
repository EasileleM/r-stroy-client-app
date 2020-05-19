import { call } from 'redux-saga/effects';
import { apiService } from '../../../services/APIService';
import { loadCurrentUser } from './loadCurrentUser';
import { SignUpData } from '../../../interfaces/SignUpData';

export function* signUp(data: SignUpData) {
  yield call(apiService.signUp, data);

  yield call(loadCurrentUser);
}