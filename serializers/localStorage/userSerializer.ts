import { User } from '../../interfaces/User';

export function userSerializer(user: User) {
  return JSON.stringify({
    isGuest: user.isGuest,
    cartProducts: user.cartProducts.map(product => {
      return { id: product.id, amountInCart: product.amountInCart };
    }),
    favoritesProducts: user.favoritesProducts.map(({ id }) => id)
  });
}