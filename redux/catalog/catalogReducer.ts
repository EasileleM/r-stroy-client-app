import {
  APPLY_FILTERS,
  APPLY_SEARCH,
  CatalogActionTypes,
  CatalogState,
  CHANGE_FILTERS_LOADING_STATE,
  CHANGE_PAGE,
  CHANGE_PRODUCTS_LOADING_STATE,
  UPDATE_FILTERS,
  UPDATE_PRODUCTS
} from './types';
import { SYNC_CATALOG, SyncActionTypes } from '../productsSync/types';

const initialState: CatalogState = {
  products: [],
  filters: null,
  appliedFilters: null,
  searchQuery: '',
  areFiltersLoading: true,
  areProductsLoading: true,
  currentPage: 0,
  pagesAmount: 0
};

export function catalogReducer(
  state: CatalogState = initialState,
  action: CatalogActionTypes | SyncActionTypes
): CatalogState {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        ...action.payload
      };
    case SYNC_CATALOG:
      return {
        ...state,
        products: action.payload
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case CHANGE_FILTERS_LOADING_STATE:
      return {
        ...state,
        areFiltersLoading: action.payload
      };
    case CHANGE_PRODUCTS_LOADING_STATE:
      return {
        ...state,
        areProductsLoading: action.payload
      };
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case APPLY_SEARCH:
      return {
        ...state,
        searchQuery: action.payload
      };
    case APPLY_FILTERS:
      return {
        ...state,
        appliedFilters: action.payload
      };
    default:
      return state;
  }
}
