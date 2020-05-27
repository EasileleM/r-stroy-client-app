import { SET_PERSONAL_DATA_UPDATE_ERROR, SetPersonalDataUpdateErrorAction } from '../types';

export function setPersonalDataUpdateErrorAction(
  errorMsg: string
): SetPersonalDataUpdateErrorAction {
  return {
    type: SET_PERSONAL_DATA_UPDATE_ERROR,
    payload: errorMsg
  };
}