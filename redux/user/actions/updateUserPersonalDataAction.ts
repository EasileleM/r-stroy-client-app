import { UPDATE_USER_PERSONAL_DATA, UpdateUserPersonalDataAction } from '../types';
import { PersonalData } from '../../../interfaces/PersonalData';

export function updateUserPersonalDataAction(
  data: PersonalData
): UpdateUserPersonalDataAction {
  return {
    type: UPDATE_USER_PERSONAL_DATA,
    payload: data
  };
}