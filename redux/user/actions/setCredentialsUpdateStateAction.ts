import { SET_CREDENTIALS_UPDATE_STATE, SetCredentialsUpdateStateAction } from '../types';

export function setCredentialsUpdateStateAction(
  state: boolean
): SetCredentialsUpdateStateAction {
  return {
    type: SET_CREDENTIALS_UPDATE_STATE,
    payload: state
  };
}