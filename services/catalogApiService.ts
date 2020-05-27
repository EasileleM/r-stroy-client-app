import { Filters } from '../interfaces/Filters';
import { Product } from '../interfaces/Product';

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

const filters: Filters = {
  types: ['te', 'da', 'yes'],
  lowestPrice: 0,
  highestPrice: 1000
};

export class CatalogApiService {
  /**
   * Fetches initial filters.
   */
  async getFilters(): Promise<Filters> {
    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve(filters);
      }, 1000);
    });
  }

  /**
   * Fetched products with given appliedFilters and searchQuery.
   *
   * @param appliedFilters
   * @param searchQuery
   */
  async getProducts(
    appliedFilters: Filters, searchQuery: string
  ): Promise<Array<Product>> {

    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve(productsArray);
      }, 1000);
    });
  }
}

export const catalogApiService = new CatalogApiService();