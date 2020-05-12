import { Router } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../../../interfaces/Filters';
import { APPLY_FILTERS, APPLY_SEARCH, CatalogActionTypes } from '../interfaces';
import { clearQueryFromFilters } from '../../../utils/cleanQueryFromFilters';
import { appliedFiltersToQueryInput } from '../../../utils/appliedFiltersToQueryInput';
import { AppThunk } from '../../rootTypes';
import { applySearchAction } from './applySearchAction';
import { applyFiltersAction } from './applyFiltersAction';

// eslint-disable-next-line max-len
export function applyFiltersActionCreator(appliedFilters: Filters): CatalogActionTypes {
  return {
    type: APPLY_FILTERS,
    payload: appliedFilters
  };
}

// eslint-disable-next-line max-len
export function applySearchActionCreator(searchQuery: string): CatalogActionTypes {
  return {
    type: APPLY_SEARCH,
    payload: searchQuery
  };
}

type Options = {
  appliedFilters?: Filters;
  searchQuery?: string;
};

export const applyCatalogArgumentsAction = (
  { appliedFilters, searchQuery }: Options, router: Router = null
): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const { filters } = getState().catalog;

  if (router) {
    let query: ParsedUrlQueryInput = {
      ...router.query
    };
    if (appliedFilters) {
      query = {
        ...clearQueryFromFilters(router.query, filters),
        ...appliedFiltersToQueryInput(appliedFilters, filters)
      };
    }

    if (searchQuery || searchQuery === '') {
      delete query.q;
      
      if (searchQuery !== '') {
        query.q = searchQuery;
      }
    }

    await router.push({
      pathname: '/catalog',
      query
    });
  }

  if (appliedFilters) {
    dispatch(applyFiltersAction(appliedFilters));
  }

  if (searchQuery || searchQuery === '') {
    dispatch(applySearchAction(searchQuery));
  }

};
