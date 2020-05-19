import { PersonalData } from '../../../interfaces/PersonalData';
import { UPDATE_USER_PERSONAL_DATA, UpdateUserPersonalDataAction } from '../types';

export function updateUserPersonalDataAction(
  personalData: PersonalData
): UpdateUserPersonalDataAction {
  return {
    type: UPDATE_USER_PERSONAL_DATA,
    payload: personalData
  };
}