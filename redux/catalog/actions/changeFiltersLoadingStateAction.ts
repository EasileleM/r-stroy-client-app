import { CatalogActionTypes, CHANGE_FILTERS_LOADING_STATE } from '../types';

export function changeFiltersLoadingStateAction(
  areFiltersLoading: boolean
): CatalogActionTypes {
  return {
    type: CHANGE_FILTERS_LOADING_STATE,
    payload: areFiltersLoading
  };
}
