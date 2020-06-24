import { AUTHORIZE_USER, AuthorizeUserAction } from '../types';

export function authorizeUserAction(): AuthorizeUserAction {
  return {
    type: AUTHORIZE_USER
  };
}