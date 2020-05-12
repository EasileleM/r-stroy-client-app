import { Product } from '../../interfaces/Product';
import { Filters } from '../../interfaces/Filters';

export const UPDATE_FILTERS = 'LOAD_FILTERS';
export const UPDATE_PRODUCTS = 'LOAD_PRODUCTS';
export const APPLY_SEARCH = 'APPLY_SEARCH';
export const APPLY_FILTERS = 'APPLY_FILTERS';

export interface CatalogState {
  products: Array<Product>;
  filters: Filters;
  appliedFilters: Filters;
  searchQuery: string;
}

export interface LoadFiltersAction {
  type: typeof UPDATE_FILTERS;
  payload: Filters;
}

export interface LoadProductsAction {
  type: typeof UPDATE_PRODUCTS;
  payload: Array<Product>;
}

export interface ApplySearchAction {
  type: typeof APPLY_SEARCH;
  payload: string;
}

export interface ApplyFiltersAction {
  type: typeof APPLY_FILTERS;
  payload: Filters;
}

export type CatalogActionTypes = LoadFiltersAction |
LoadProductsAction | 
ApplySearchAction |
ApplyFiltersAction;