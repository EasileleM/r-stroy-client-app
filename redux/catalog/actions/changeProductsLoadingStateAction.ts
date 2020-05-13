import { CatalogActionTypes, CHANGE_PRODUCTS_LOADING_STATE } from '../types';

export function changeProductsLoadingStateAction(
  areProductsLoading: boolean
): CatalogActionTypes {
  return {
    type: CHANGE_PRODUCTS_LOADING_STATE,
    payload: areProductsLoading
  };
}
