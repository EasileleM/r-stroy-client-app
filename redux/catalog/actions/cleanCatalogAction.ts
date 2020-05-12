import { Router } from 'next/router';
import { AppThunk } from '../../rootTypes';
import { updateProductsActionCreator } from './updateProductsAction';
import {
  applyFiltersActionCreator,
  applySearchActionCreator
} from './applyCatalogArgumentsAction';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const cleanCatalogAction = (router: Router): AppThunk => async (dispatch, getState) => {
  const { filters } = getState().catalog;
  dispatch(updateProductsActionCreator([]));
  dispatch(applyFiltersActionCreator({ ...filters, types: [] }));
  dispatch(applySearchActionCreator(''));
};
