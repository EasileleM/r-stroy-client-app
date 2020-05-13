import { Router } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../../../interfaces/Filters';
import { clearQueryFromFilters } from '../../../utils/cleanQueryFromFilters';
import { appliedFiltersToQueryInput } from '../../../utils/appliedFiltersToQueryInput';
import { AppThunk } from '../../rootTypes';
import { applySearchAction } from './applySearchAction';
import { applyFiltersAction } from './applyFiltersAction';

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
