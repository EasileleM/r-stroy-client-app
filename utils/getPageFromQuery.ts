import { routerService } from '../services/RouterService';

/**
 * returns current applied searchQuery string from URL query
 */
export function getPageFromQuery(): number {
  return Number(routerService.getQuery().get('page') ) || 1;
}