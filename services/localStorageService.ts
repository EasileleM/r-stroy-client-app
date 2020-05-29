import { User } from '../interfaces/User';
import { DEFAULT_USER, LOCAL_STORAGE_USER_KEY } from '../contants/const';
import { CartProduct } from '../interfaces/CartProduct';
import { Product } from '../interfaces/Product';
import { userSerializer } from '../serializers/localStorage/userSerializer';

export class LocalStorageService {
  /**
   * Returns current local user
   */
  getRawUser() {
    if (typeof window !== 'undefined'  && window.localStorage) {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    }
    return null;
  }

  /**
   * Deletes user's record
   */
  deleteUser() {
    if (typeof window !== 'undefined'  && window.localStorage) {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }

  /**
   * Serializes fresh user to local storage
   * @param newUser
   */
  serializeUser(newUser: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, userSerializer(newUser));
    }
  }

  /**
   * Stores raw user to local storage
   * @param rawUser
   */
  updateUser(rawUser) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(rawUser));
    }
  }

  /**
   * Updates user's cart
   * @param newCart
   */
  updateCart(newCart: Array<CartProduct>) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const newRawUser = {
        ...this.getRawUser(),
        cartProducts: newCart.map(product => {
          return { id: product.id, amountInCart: product.amountInCart };
        })
      };
      this.updateUser(newRawUser);
    }
  }

  /**
   * updates user's favorites
   * @param newFavorites
   */
  updateFavorites(newFavorites: Array<Product>) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const newRawUser = {
        ...this.getRawUser(),
        favoritesProducts: newFavorites.map(({ id }) => id)
      };
      this.updateUser(newRawUser);
    }
  }

  /**
   * Creates new user. If none initialUser passed,
   * uses default user value.
   * @param initialUser
   */
  createUser(initialUser: User = null): User {
    const newUser = initialUser || DEFAULT_USER;
    this.serializeUser(newUser);
    return newUser;
  }
}

export const localStorageService = new LocalStorageService();