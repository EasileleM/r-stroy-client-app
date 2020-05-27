import { SET_CREDENTIALS_UPDATE_ERROR, SetCredentialsUpdateErrorAction } from '../types';

export function setCredentialsUpdateErrorAction(
  errorMsg: string
): SetCredentialsUpdateErrorAction {
  return {
    type: SET_CREDENTIALS_UPDATE_ERROR,
    payload: errorMsg
  };
}