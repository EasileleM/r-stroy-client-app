import { User } from '../interfaces/User';
import { productsApiService } from '../services/productsApiService';
import { localStorageService } from '../services/localStorageService';

/**
 * Returns current local user with fresh fetched cart,favorites and orders
 */
export async function getFreshLocalUser(): Promise<User> {
  const localUser = localStorageService.getRawUser();

  if (localUser) {
    const savedLocalProductIds = [...new Set([
      ...localUser.favoritesProducts,
      ...localUser.cartProducts.map(({ id }) => id)
    ])];

    let freshLocalProducts = [];

    if (savedLocalProductIds.length) {
      freshLocalProducts = await productsApiService
        .getProductsById(savedLocalProductIds);
    }

    localUser.favoritesProducts =
      fillRawFavorites(localUser.favoritesProducts, freshLocalProducts);
    localUser.cartProducts =
      fillRawCart(localUser.cartProducts, freshLocalProducts);
  }

  return localUser;
}

function fillRawFavorites(rawItems, freshItems) {
  const filledItems = [];
  rawItems.forEach(rawItemId => {
    const freshItem = freshItems.find((item) => item.id === rawItemId);
    if (freshItem) {
      filledItems.push({
        ...freshItem
      });
    }
  });
  return filledItems;
}

function fillRawCart(rawItems, freshItems) {
  const filledItems = [];
  rawItems.forEach(rawItem => {
    const freshItem = freshItems.find(({ id }) => id === rawItem.id);
    if (freshItem) {
      filledItems.push({
        ...rawItem,
        ...freshItem,
        amountInCart: Math.min(freshItem.amount, rawItem.amountInCart)
      });
    }
  });
  return filledItems;
}