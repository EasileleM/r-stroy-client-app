import { Filters } from '../interfaces/Filters';

export async function fetchFilters(): Promise<Filters> {
  return filters;
}

const filters: Filters = {
  types: ['te', 'da', 'yes'],
  lowestPrice: 0,
  highestPrice: 1000
};