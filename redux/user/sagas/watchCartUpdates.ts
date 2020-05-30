import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {
  ADD_TO_CART,
  AddToCartAction,
  CHANGE_CART_PRODUCT_AMOUNT, ChangeCartProductAmountAction,
  REMOVE_FROM_CART,
  RemoveFromCartAction
} from '../types';
import { updateCartAction } from '../actions/updateCartAction';
import { userApiService } from '../../../services/userApiService';
import { localStorageService } from '../../../services/localStorageService';
import { CartProduct } from '../../../interfaces/CartProduct';
import { CART_MAX_PRODUCT_AMOUNT_MSG, CART_PRODUCT_ADDED_MSG } from '../../../contants/const';

export function* watchCartUpdates() {
  yield takeEvery([
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_CART_PRODUCT_AMOUNT
  ], cartUpdatesWorker);
}

function* cartUpdatesWorker({
  type,
  payload: product
}: AddToCartAction | RemoveFromCartAction | ChangeCartProductAmountAction) {
  const {
    user: {
      cartProducts,
      isGuest
    }
  } = yield select();

  const newCartProducts = cartProducts.slice();

  const existingProduct = newCartProducts
    .findIndex((item) => item.id === product.id);

  const newProduct = { ...product };

  if (type === ADD_TO_CART) {

    if (existingProduct === -1) {
      newCartProducts.push({ ...newProduct, amountInCart: 1 });
    } else {
      const newAmount = newCartProducts[existingProduct].amountInCart + 1;

      if (newAmount > newCartProducts[existingProduct].amount) {
        toast.error(CART_MAX_PRODUCT_AMOUNT_MSG);
        return;
      }

      newCartProducts[existingProduct].amountInCart = newAmount;
    }

    toast.info(CART_PRODUCT_ADDED_MSG);
  } else if (type === CHANGE_CART_PRODUCT_AMOUNT) {
    newCartProducts[existingProduct].amountInCart = Math
      .min((newProduct as CartProduct).amountInCart, newProduct.amount);
  } else if (existingProduct !== -1) {
    newCartProducts.splice(existingProduct, 1);
  }
  
  yield put(updateCartAction(newCartProducts));
  if (isGuest) {
    localStorageService.updateCart(newCartProducts);
  } else {
    yield call(userApiService.patchCart, newCartProducts);
  }
}