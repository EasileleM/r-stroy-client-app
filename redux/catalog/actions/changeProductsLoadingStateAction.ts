import { CHANGE_PRODUCTS_LOADING_STATE, ChangeProductsLoadingStateAction } from '../types';

export function changeProductsLoadingStateAction(
  areProductsLoading: boolean
): ChangeProductsLoadingStateAction {
  return {
    type: CHANGE_PRODUCTS_LOADING_STATE,
    payload: areProductsLoading
  };
}
