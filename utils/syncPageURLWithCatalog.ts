import { Filters } from '../interfaces/Filters';
import { appliedFiltersToURLSearchParams } from './appliedFiltersToURLSearchParams';
import { router } from '../services/router';
import { clearQueryFromFilters } from './clearQueryFromFilters';

/**
 * Synchronizes appliedFilters and searchQuery
 * with current page URL query.
 *
 * @param appliedFilters
 * @param searchQuery
 * @param initialFilters
 */
export function syncPageURLWithCatalog(
  appliedFilters: Filters, searchQuery: string, initialFilters: Filters
) {
  const query: URLSearchParams = new URLSearchParams(
    clearQueryFromFilters(router.getQuery(), initialFilters)
  );

  const filtersQuery = appliedFiltersToURLSearchParams(
    appliedFilters, initialFilters
  );
  for (const [key, value] of filtersQuery.entries()) {
    query.append(key, value);
  }

  query.delete('q');
  if (searchQuery !== '') {
    query.set('q', searchQuery);
  }

  router.updateQuery(query);
}