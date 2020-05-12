import { CatalogActionTypes, CHANGE_PRODUCTS_LOADING_STATE } from '../interfaces';

// eslint-disable-next-line max-len
export function changeProductsLoadingStateAction(areProductsLoading: boolean): CatalogActionTypes {
  return {
    type: CHANGE_PRODUCTS_LOADING_STATE,
    payload: areProductsLoading
  };
}
