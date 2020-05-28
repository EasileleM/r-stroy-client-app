import { Credentials } from '../../../interfaces/Credentials';
import { UPDATE_USER_LOGIN, UpdateUserLoginAction } from '../types';

export function updateUserCredentialsAction(
  credentials: Credentials
): UpdateUserLoginAction {
  return {
    type: UPDATE_USER_LOGIN,
    payload: credentials
  };
}