import { Product } from '../../interfaces/Product';
import { Filters } from '../../interfaces/Filters';
import { Pagination } from '../../interfaces/Pagination';

export const CATALOG_INIT = 'CATALOG_INIT';
export const CATALOG_RESET = 'CATALOG_RESET';

export const UPDATE_FILTERS = 'LOAD_FILTERS';
export const APPLY_SEARCH = 'APPLY_SEARCH';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
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
  currentPage: number;
  pagesAmount: number;
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
  payload: Pagination;
}

export interface ApplySearchAction {
  type: typeof APPLY_SEARCH;
  payload: string;
}

export interface ApplyFiltersAction {
  type: typeof APPLY_FILTERS;
  payload: Filters;
}

export interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  payload: number;
}

export type CatalogActionTypes =
  UpdateFiltersAction |
  UpdateProductsAction |
  ApplySearchAction |
  ApplyFiltersAction |
  ChangeFiltersLoadingStateAction |
  ChangeProductsLoadingStateAction |
  CatalogInitAction |
  CatalogResetAction |
  ChangePageAction;