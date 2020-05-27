import { UPDATE_USER_PERSONAL_DATA, UpdateUserPersonalDataAction } from '../types';
import { SignUpData } from '../../../interfaces/SignUpData';

export function updateUserPersonalDataAction(
  data: SignUpData
): UpdateUserPersonalDataAction {
  return {
    type: UPDATE_USER_PERSONAL_DATA,
    payload: data
  };
}