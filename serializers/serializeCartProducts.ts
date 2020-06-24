import { CartProduct } from '../interfaces/CartProduct';

export function serializeCartProducts(products: Array<CartProduct>) {
  return products.map(product => {
    return {
      productId: product.id,
      amountInStash: product.amountInCart
    };
  });
}