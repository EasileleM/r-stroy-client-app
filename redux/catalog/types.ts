import { Product } from '../../interfaces/Product';
import { Filters } from '../../interfaces/Filters';

export const CATALOG_INIT = 'CATALOG_INIT';
export const CATALOG_RESET = 'CATALOG_RESET';

export const UPDATE_FILTERS = 'LOAD_FILTERS';
export const APPLY_SEARCH = 'APPLY_SEARCH';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const UPDATE_PRODUCTS = 'LOAD_PRODUCTS';

export const CHANGE_FILTERS_LOADING_STATE = 'CHANGE_FILTERS_LOADING_STATE';
export const CHANGE_PRODUCTS_LOADING_STATE = 'CHANGE_PRODUCTS_LOADING_STATE';

export interface CatalogState {
  products: Array<Product>;
  filters: Filters;
  appliedFilters: Filters;
  searchQuery: string;
  areFiltersLoading: boolean;
  areProductsLoading: boolean;
}

export interface CatalogInitAction {
  type: typeof CATALOG_INIT;
}

export interface CatalogResetAction {
  type: typeof CATALOG_RESET;
}

export interface ChangeFiltersLoadingStateAction {
  type: typeof CHANGE_FILTERS_LOADING_STATE;
  payload: boolean;
}

export interface ChangeProductsLoadingStateAction {
  type: typeof CHANGE_PRODUCTS_LOADING_STATE;
  payload: boolean;
}

export interface UpdateFiltersAction {
  type: typeof UPDATE_FILTERS;
  payload: Filters;
}

export interface UpdateProductsAction {
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

export type CatalogActionTypes =
  UpdateFiltersAction |
  UpdateProductsAction |
  ApplySearchAction |
  ApplyFiltersAction |
  ChangeFiltersLoadingStateAction |
  ChangeProductsLoadingStateAction |
  CatalogInitAction |
  CatalogResetAction;