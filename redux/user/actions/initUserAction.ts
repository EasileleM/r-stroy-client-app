import { INIT_USER, InitUserAction } from '../types';
import { User } from '../../../interfaces/User';

export function initUserAction(newUser: User): InitUserAction {
  return {
    type: INIT_USER,
    payload: newUser
  };
}