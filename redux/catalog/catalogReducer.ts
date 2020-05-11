import { CatalogActionTypes, CatalogState, FILL_CATALOG } from './interfaces';

const initialState: CatalogState = {
  products: []
};

export function catalogReducer(
  state: CatalogState = initialState,
  action: CatalogActionTypes
): CatalogState {
  switch (action.type) {
    case FILL_CATALOG:
      return {
        products: action.payload
      };
    default:
      return state;
  }
}