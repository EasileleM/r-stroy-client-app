import { Product } from '../interfaces/Product';
import { Filters } from '../interfaces/Filters';

// eslint-disable-next-line max-len
export async function fetchProducts(appliedFilters: Filters, searchQuery: string): Promise<Array<Product>> {
  return productsArray;
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