import { AppThunk } from '../../rootTypes';
import { Filters } from '../../../interfaces/Filters';
import { APPLY_FILTERS, CatalogActionTypes } from '../interfaces';
import { updateProductsAction } from './updateProductsAction';

// eslint-disable-next-line max-len
function applyFiltersActionCreator(appliedFilters: Filters): CatalogActionTypes {
  return {
    type: APPLY_FILTERS,
    payload: appliedFilters
  };
}

// eslint-disable-next-line max-len
export const applyFiltersAction = (appliedFilters): AppThunk => async (dispatch) => {
  dispatch(applyFiltersActionCreator(appliedFilters));
  dispatch(updateProductsAction());
};
