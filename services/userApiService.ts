import { User } from '../interfaces/User';
import { SignUpData } from '../interfaces/SignUpData';
import { SignInData } from '../interfaces/SignInData';
import { Product } from '../interfaces/Product';
import { Order } from '../interfaces/Order';
import { PatchUserData } from '../interfaces/PatchUserData';
import { CreateOrderData } from '../interfaces/CreateOrderData';

const mockUser: User = {
  isGuest: false,
  personalData: {
    firstName: 'Савва',
    lastName: 'Джумалиев',
    email: 'pro100prosavva@gmail.com',
    phoneNumber: '89616483800'
  },
  orders: [],
  cartProducts: [],
  favoritesProducts: []
};

// TODO write serializers and deserializers
export class UserApiService {
  /**
   * Fetches authorized user by GET request. Returns User data if user
   * has corresponding cookies. Returns null otherwise.
   */
  async getUser(): Promise<User> {
    // TODO set isGuest: false
    return new Promise((resolve) => { // TODO make request real
      setTimeout(() => {
        resolve(mockUser);
      }, 1000);
    });
  }

  async patchUserPersonalData(data: PatchUserData): Promise<void> {
    return Promise.resolve();
  }

  async patchCart(newCart: Array<Product>): Promise<void> {
    return Promise.resolve();
  }

  async patchFavorites(newFavorites: Array<Product>): Promise<void> {
    return Promise.resolve();
  }

  async createOrder(newOrder: CreateOrderData): Promise<void> {
    return Promise.resolve();
  }

  async cancelOrder(newOrder: Order): Promise<void> {
    return Promise.resolve();
  }

  async getOrders(): Promise<void> {
    return Promise.resolve();
  }

  // POST
  async signIn(data: SignInData): Promise<void> {
    return new Promise((resolve, reject) => { // TODO make request real
      setTimeout(() => {
        reject({ data: { errors: { password: 'Меняй мыло' } } });
      }, 1000);
    });
  }

  // POST
  async signUp(data: SignUpData): Promise<void> {
    return new Promise((resolve, reject) => { // TODO make request real
      setTimeout(() => {
        resolve();
      }, 1000);
    });

  }

  // POST
  async logout(): Promise<void> {
    return Promise.resolve();
  }
}

export const userApiService = new UserApiService();