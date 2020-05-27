import { call, put, takeLatest } from '@redux-saga/core/effects';
import { UPDATE_USER_PERSONAL_DATA, UpdateUserPersonalDataAction } from '../../types';
import { userApiService } from '../../../../services/userApiService';
import { setPersonalDataUpdateStateAction } from '../../actions/setPersonalDataUpdateStateAction';
import { setPersonalDataUpdateErrorAction } from '../../actions/setPersonalDataUpdateErrorAction';
import { setUserPersonalDataAction } from '../../actions/setUserPersonalDataAction';

export function* watchPersonalDataUpdates() {
  yield takeLatest(UPDATE_USER_PERSONAL_DATA, personalDataUpdate);
}

function* personalDataUpdate({ payload }: UpdateUserPersonalDataAction) {
  yield put(setPersonalDataUpdateErrorAction(null));
  yield put(setPersonalDataUpdateStateAction(true));
  // TODO rewrite try catch after backend will appear
  try {
    yield call(userApiService.patchPersonalData, payload);
    yield put(setUserPersonalDataAction(payload.personalData));
  } catch(e) {
    if (e.code === 409 || e.code === 403) {
      yield put(setPersonalDataUpdateErrorAction(e.message));
    } else {
      throw e;
    }
  }
  yield put(setPersonalDataUpdateStateAction(false));
}