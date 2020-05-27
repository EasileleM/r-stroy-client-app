import { Credentials } from '../../../interfaces/Credentials';
import { SET_USER_CREDENTIALS, SetUserCredentialsAction } from '../types';

export function setUserCredentialsAction(
  credentials: Credentials
): SetUserCredentialsAction {
  return {
    type: SET_USER_CREDENTIALS,
    payload: credentials
  };
}