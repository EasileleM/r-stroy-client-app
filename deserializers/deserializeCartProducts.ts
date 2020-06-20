import { CartProduct } from '../interfaces/CartProduct';

export function deserializeCartProducts(rawCartProducts): Array<CartProduct> {
  return rawCartProducts.map(rawProduct => {
    return {
      ...rawProduct.product,
      amountInCart: rawProduct.amountInStash
    };
  });
}