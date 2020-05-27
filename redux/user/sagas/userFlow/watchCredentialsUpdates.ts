import { call, put, takeLatest } from '@redux-saga/core/effects';
import { UPDATE_USER_CREDENTIALS, UpdateUserCredentialsAction } from '../../types';
import { userApiService } from '../../../../services/userApiService';
import { setCredentialsUpdateStateAction } from '../../actions/setCredentialsUpdateStateAction';
import { setCredentialsUpdateErrorAction } from '../../actions/setCredentialsUpdateErrorAction';
import { setUserCredentialsAction } from '../../actions/setUserCredentialsAction';

export function* watchCredentialsUpdates() {
  yield takeLatest(UPDATE_USER_CREDENTIALS, credentialsUpdate);
}

function* credentialsUpdate({ payload }: UpdateUserCredentialsAction) {
  yield put(setCredentialsUpdateErrorAction(null));
  yield put(setCredentialsUpdateStateAction(true));
  // TODO rewrite try catch after backend will appear
  try {
    yield call(userApiService.patchCredentials, payload);
    yield put(setUserCredentialsAction({ login: payload.newLogin }));
  } catch(e) {
    if (e.code === 409 || e.code === 403) {
      yield put(setCredentialsUpdateErrorAction(e.message));
    } else {
      throw e;
    }
  }
  yield put(setCredentialsUpdateStateAction(false));
}