import { CartProduct } from '../../../interfaces/CartProduct';
import { CHANGE_CART_PRODUCT_AMOUNT, ChangeCartProductAmountAction } from '../types';

export function changeCartProductAmountAction(
  newCartProduct: CartProduct
): ChangeCartProductAmountAction {
  return {
    type: CHANGE_CART_PRODUCT_AMOUNT,
    payload: newCartProduct
  };
}