import { User } from '../interfaces/User';
import { SignUpData } from '../interfaces/SignUpData';
import { SignInData } from '../interfaces/SignInData';
import { Product } from '../interfaces/Product';
import { Order } from '../interfaces/Order';
import { Credentials } from '../interfaces/Credentials';

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
        resolve(null);
      }, 1000);
    });
  }

  async patchPersonalData(
    newPersonalData: SignUpData
  ): Promise<void> {
    return Promise.resolve();
  }

  async patchCredentials(newCredentials: Credentials): Promise<void> {
    return Promise.resolve();
  }
  
  async patchCart(newCart: Array<Product>): Promise<void> {
    return Promise.resolve();
  }

  async patchFavorites(newFavorites: Array<Product>): Promise<void> {
    return Promise.resolve();
  }

  async createOrder(newOrder: Order): Promise<void> {
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
}

export const userApiService = new UserApiService();