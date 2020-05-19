import { User } from '../interfaces/User';
import { DEFAULT_USER, LOCAL_STORAGE_USER_KEY } from '../contants/const';

export class LocalStorageService {
  /**
   * Returns current local user and if none stores in localStorage default user
   * and returns it.
   */
  getUser(): User {
    const rawUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (!rawUser) {
      return this.createUser();
    }
    return JSON.parse(rawUser);
  }

  /**
   * Deletes user's record
   */
  deleteUser() {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  /**
   * Stores new user to local storage
   * @param newUser
   */
  updateUser(newUser: User) {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
  }

  /**
   * Creates new user. If none initialUser passed,
   * uses default user value.
   * @param initialUser
   */
  createUser(initialUser: User = null): User {
    const newUser = initialUser || DEFAULT_USER;
    this.updateUser(newUser);
    return newUser;
  }
}

export const localStorageService = new LocalStorageService();