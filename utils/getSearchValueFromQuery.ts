import { routerService } from '../services/RouterService';

/**
 * returns current applied searchQuery string from URL query
 */
export function getSearchValueFromQuery(): string {
  return routerService.getQuery().get('q') || '';
}