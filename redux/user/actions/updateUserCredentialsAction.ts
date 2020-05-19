import { Credentials } from '../../../interfaces/Credentials';
import { UPDATE_USER_CREDENTIALS, UpdateUserCredentialsAction } from '../types';

export function updateUserCredentialsAction(
  credentials: Credentials
): UpdateUserCredentialsAction {
  return {
    type: UPDATE_USER_CREDENTIALS,
    payload: credentials
  };
}