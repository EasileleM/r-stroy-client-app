import { Filters } from '../interfaces/Filters';
import { appliedFiltersToURLSearchParams } from './appliedFiltersToURLSearchParams';
import { clearQueryFromFilters } from './clearQueryFromFilters';
import { routerService } from '../services/RouterService';

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
    clearQueryFromFilters(routerService.getQuery(), initialFilters)
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

  routerService.updateQuery(query);
}