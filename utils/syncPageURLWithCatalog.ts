import { ParsedUrlQueryInput } from 'querystring';
import { clearQueryFromFilters } from './cleanQueryFromFilters';
import { appliedFiltersToQueryInput } from './appliedFiltersToQueryInput';

/**
 * Synchronizes appliedFilters and searchQuery
 * with current page URL query.
 *
 * @param appliedFilters
 * @param searchQuery
 * @param initialFilters
 * @param router
 */
export async function syncPageURLWithCatalog(
  appliedFilters, searchQuery, initialFilters, router
) {
  const query: ParsedUrlQueryInput = {
    ...clearQueryFromFilters(router.query, initialFilters),
    ...appliedFiltersToQueryInput(appliedFilters, initialFilters)
  };

  delete query.q;
  if (searchQuery !== '') {
    query.q = searchQuery;
  }

  await router.push({
    pathname: '/catalog',
    query
  });
}