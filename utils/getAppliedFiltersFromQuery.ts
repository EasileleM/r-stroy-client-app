import { Filters } from '../interfaces/Filters';
import { routerService } from '../services/RouterService';

/**
 * Returns filters parsed from current query string
 *
 * @param initialFilters
 */
export function getAppliedFiltersFromQuery(initialFilters: Filters): Filters {
  const result: Filters = {
    ...initialFilters,
    types: []
  };
  const query = routerService.getQuery();
  
  if (query.get('lowestPrice')) {
    result.lowestPrice = Number(query.get('lowestPrice'));
  }
  if (query.get('highestPrice')) {
    result.highestPrice = Number(query.get('highestPrice'));
  }
  if (query.getAll('types')) {
    result.types = query.getAll('types');
  }
  return result;
}