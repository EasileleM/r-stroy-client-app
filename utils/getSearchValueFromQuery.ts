import { router } from '../services/router';

/**
 * returns current applied searchQuery string from URL query
 */
export function getSearchValueFromQuery(): string {
  return router.getQuery().get('q') || '';
}