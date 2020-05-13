import { ParsedUrlQueryInput } from 'querystring';
import { clearQueryFromFilters } from './cleanQueryFromFilters';
import { appliedFiltersToQueryInput } from './appliedFiltersToQueryInput';

// eslint-disable-next-line max-len
export async function syncHistoryWithCatalog(appliedFilters, searchQuery, initialFilters, router) {
  let query: ParsedUrlQueryInput = {
    ...router.query
  };
  if (appliedFilters) {
    query = {
      ...clearQueryFromFilters(router.query, initialFilters),
      ...appliedFiltersToQueryInput(appliedFilters, initialFilters)
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