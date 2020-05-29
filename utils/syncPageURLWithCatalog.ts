import { Filters } from '../interfaces/Filters';
import { appliedFiltersToURLSearchParams } from './appliedFiltersToURLSearchParams';
import { clearQueryFromFilters } from './clearQueryFromFilters';
import { routerService } from '../services/RouterService';

/**
 * Synchronizes appliedFilters, searchQuery and pageNumber
 * with current page URL query.
 *
 * @param appliedFilters
 * @param searchQuery
 * @param currentPage
 * @param initialFilters
 */
export function syncPageURLWithCatalog(
  appliedFilters: Filters,
  searchQuery: string,
  currentPage: number,
  initialFilters: Filters
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

  query.delete('page');
  if (currentPage !== 1) {
    query.set('page', String(currentPage));
  }

  routerService.updateQuery(query);
}