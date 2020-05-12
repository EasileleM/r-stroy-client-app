import { CatalogActionTypes, CHANGE_LOADING_STATE } from '../interfaces';

// eslint-disable-next-line max-len
export function changeLoadingStateAction(isLoading: boolean): CatalogActionTypes {
  return {
    type: CHANGE_LOADING_STATE,
    payload: isLoading
  };
}
