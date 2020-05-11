import { Product } from '../../interfaces/Product';
import { Filters } from '../../interfaces/Filters';

export const UPDATE_FILTERS = 'LOAD_FILTERS';
export const UPDATE_PRODUCTS = 'LOAD_PRODUCTS';

export interface CatalogState {
  products: Array<Product>;
  filters: Filters
}

export interface LoadFiltersAction {
  type: typeof UPDATE_FILTERS;
  payload: Filters;
}

export interface LoadProductsAction {
  type: typeof UPDATE_PRODUCTS;
  payload: Array<Product>;
}

export type CatalogActionTypes = LoadFiltersAction |
LoadProductsAction;