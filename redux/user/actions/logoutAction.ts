import { LOGOUT, LogoutAction } from '../types';

export function logoutAction(): LogoutAction {
  return {
    type: LOGOUT,
  };
}