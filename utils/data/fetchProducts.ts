import { Product } from '../../interfaces/Product';
import { Filters } from '../../interfaces/Filters';

/**
 * Fetched products with given appliedFilters and searchQuery.
 *
 * @param appliedFilters
 * @param searchQuery
 */
export async function fetchProducts(
  appliedFilters: Filters, searchQuery: string
): Promise<Array<Product>> {
  return new Promise((resolve) => { // TODO make request real
    setTimeout(() => {
      resolve(productsArray);
    }, 1000);
  });
}

const productsArray: Array<Product> = [
  {
    id: '1',
    name: 'first',
    description: 'here',
    amount: 12,
    types: ['yes', 'da', 'norm'],
    price: 120,
    imageURL: 'fasdfasd',
    inCart: false,
    inFavorites: false
  },
  {
    id: '2',
    name: 'first',
    description: 'here',
    amount: 12,
    types: ['yes', 'da', 'norm'],
    price: 120,
    imageURL: 'fasdfasd',
    inCart: false,
    inFavorites: false
  },
  {
    id: '3',
    name: 'first',
    description: 'here',
    amount: 12,
    types: ['yes', 'da', 'norm'],
    price: 120,
    imageURL: 'fasdfasd',
    inCart: false,
    inFavorites: false
  }
];