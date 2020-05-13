import { CatalogActionTypes, CHANGE_FILTERS_LOADING_STATE } from '../interfaces';

// eslint-disable-next-line max-len
export function changeFiltersLoadingStateAction(isLoading: boolean): CatalogActionTypes {
  return {
    type: CHANGE_FILTERS_LOADING_STATE,
    payload: isLoading
  };
}
