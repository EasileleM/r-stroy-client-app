import { APPLY_FILTERS, CatalogActionTypes, CatalogState, UPDATE_FILTERS, UPDATE_PRODUCTS } from './interfaces';

const initialState: CatalogState = {
  products: [],
  filters: null,
  appliedFilters: null,
  searchQuery: ''
};

export function catalogReducer(
  state: CatalogState = initialState,
  action: CatalogActionTypes
): CatalogState {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload
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