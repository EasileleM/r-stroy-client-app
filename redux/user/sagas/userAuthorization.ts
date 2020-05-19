import { call, take } from 'redux-saga/effects';
import { SIGN_IN, SIGN_UP, SignInAction, SignUpAction } from '../types';
import { signUp } from './signUp';
import { signIn } from './signIn';
import { SignUpData } from '../../../interfaces/SignUpData';
import { SignInData } from '../../../interfaces/SignInData';

export function* userAuthorization() {
  const {
    type,
    payload
  }: SignUpAction | SignInAction = yield take([SIGN_IN, SIGN_UP]);
  if (type === SIGN_IN) {
    yield call(signIn, payload as SignInData);
  } else {
    yield call(signUp, payload as SignUpData);
  }
}
