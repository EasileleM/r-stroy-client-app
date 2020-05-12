import { Router } from 'next/router';
import { AppThunk } from '../../rootTypes';
import { updateProductsAction } from './updateProductsAction';
import { applyCatalogArgumentsAction } from './applyCatalogArgumentsAction';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const updateCatalogAction = ({ appliedFilters, searchQuery }, router: Router): AppThunk => async (dispatch) => {
  await dispatch(
    applyCatalogArgumentsAction({ appliedFilters, searchQuery }, router)
  );
  await dispatch(updateProductsAction({ appliedFilters, searchQuery }));
};
