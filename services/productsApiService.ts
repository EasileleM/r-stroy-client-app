import { Filters } from '../interfaces/Filters';
import { Product } from '../interfaces/Product';
import { Pagination } from '../interfaces/Pagination';

const productsArray: Array<Product> = [
  {
    id: '4',
    name: 'first',
    description: 'here',
    amount: 6,
    types: ['yes', 'da', 'norm'],
    price: 120,
    imageURL: 'fasdfasd',
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
    inFavorites: false
  }
];

const filters: Filters = {
  types: ['te', 'da', 'yes'],
  lowestPrice: 0,
  highestPrice: 1000
};

export class ProductsApiService {
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
   * @param currentPage
   */
  async getProducts(
    appliedFilters: Filters, searchQuery: string, currentPage: number
  ): Promise<Pagination> {

    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve({ products: productsArray, pagesAmount: 10 });
      }, 1000);
    });
  }

  /**
   *
   * @param idArray
   */
  async getProductsById(
    idArray: Array<string>
  ): Promise<Array<Product>> {

    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve(productsArray.filter(({ id }) => idArray.includes(id)));
      }, 1000);
    });
  }
}

export const productsApiService = new ProductsApiService();