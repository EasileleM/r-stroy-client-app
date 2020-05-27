import { PersonalData } from '../../../interfaces/PersonalData';
import { SET_USER_PERSONAL_DATA, SetUserPersonalDataAction } from '../types';

export function setUserPersonalDataAction(
  personalData: PersonalData
): SetUserPersonalDataAction {
  return {
    type: SET_USER_PERSONAL_DATA,
    payload: personalData
  };
}