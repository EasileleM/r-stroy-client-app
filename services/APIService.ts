import { User } from '../interfaces/User';
import { Filters } from '../interfaces/Filters';
import { Product } from '../interfaces/Product';
import { SignUpData } from '../interfaces/SignUpData';
import { SignInData } from '../interfaces/SignInData';

// TODO convert functions to async/await
export class ApiService {
  /**
   * Fetches authorized user by GET request. Returns User data if user
   * has corresponding cookies. Returns null otherwise.
   */
  async getUser(): Promise<User> {
    // TODO set isGuest: false
    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  }

  // PATCH
  async patchUser(newUser: User): Promise<void> {
    return Promise.resolve();
  }

  // POST
  async signIn(data: SignInData): Promise<void> {
    return Promise.resolve();
  }

  // POST
  async signUp(data: SignUpData): Promise<void> {
    return Promise.resolve();
  }

  // POST
  async logout(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Fetches initial filters.
   */
  async getFilters(): Promise<Filters> {
    const filters: Filters = {
      types: ['te', 'da', 'yes'],
      lowestPrice: 0,
      highestPrice: 1000
    };

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
    
    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve(productsArray);
      }, 1000);
    });
  }
}

export const apiService = new ApiService();