import { AppThunk } from '../../rootTypes';
import { productsArray } from '../../../contants/const';
import { CatalogActionTypes, FILL_CATALOG } from '../interfaces';

function fillCatalogActionCreator(products): CatalogActionTypes {
  return {
    type: FILL_CATALOG,
    payload: products
  };
}

export const fillCatalogAction = (): AppThunk => async dispatch => {
  const products = await fetchProducts();
  dispatch(fillCatalogActionCreator(products));
};

function fetchProducts() {
  return Promise.resolve(productsArray);
}