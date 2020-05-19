import { CHANGE_FILTERS_LOADING_STATE, ChangeFiltersLoadingStateAction } from '../types';

export function changeFiltersLoadingStateAction(
  areFiltersLoading: boolean
): ChangeFiltersLoadingStateAction {
  return {
    type: CHANGE_FILTERS_LOADING_STATE,
    payload: areFiltersLoading
  };
}
