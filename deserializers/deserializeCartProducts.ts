import { CartProduct } from '../interfaces/CartProduct';

export function deserializeCartProducts(rawCartProducts): Array<CartProduct> {
  return rawCartProducts.map(rawProduct => {
    return {
      ...rawProduct.product,
      types: rawProduct.product.types.map(type => type.name),
      amountInCart: rawProduct.amountInStash
    };
  });
}