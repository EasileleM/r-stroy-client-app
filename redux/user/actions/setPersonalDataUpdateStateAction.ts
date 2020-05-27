import { SET_PERSONAL_DATA_UPDATE_STATE, SetPersonalDataUpdateStateAction } from '../types';

export function setPersonalDataUpdateStateAction(
  state: boolean
): SetPersonalDataUpdateStateAction {
  return {
    type: SET_PERSONAL_DATA_UPDATE_STATE,
    payload: state
  };
}