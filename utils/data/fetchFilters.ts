import { Filters } from '../../interfaces/Filters';

/**
 * Fetches initial filters.
 */
export async function fetchFilters(): Promise<Filters> {
  return new Promise((resolve) => { // TODO make request real
    setTimeout(() => {
      resolve(filters);
    }, 1000);
  });
}

const filters: Filters = {
  types: ['te', 'da', 'yes'],
  lowestPrice: 0,
  highestPrice: 1000
};