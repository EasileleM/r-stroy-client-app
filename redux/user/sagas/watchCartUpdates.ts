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

  const productIndex = newCartProducts
    .findIndex((item) => item.id === product.id);
  const newProduct = { ...product };

  if (type === ADD_TO_CART) {
    if (productIndex === -1) {
      newCartProducts.push({ ...newProduct, amountInCart: 1 });
    } else {
      const newAmount = newCartProducts[productIndex].amountInCart + 1;
      if (newAmount > newCartProducts[productIndex].amount) {
        toast.error('В вашей корзине содержится максимальное количество данного товара!');
        return;
      }
      newCartProducts[productIndex].amountInCart = newAmount;
    }
    toast.info('Добавлено в корзину!');
  } else if (type === CHANGE_CART_PRODUCT_AMOUNT) {
    newCartProducts[productIndex].amountInCart = newProduct.amount;
  } else if (productIndex !== -1) {
    newCartProducts.splice(productIndex, 1);
  }
  
  yield put(updateCartAction(newCartProducts));
  if (isGuest) {
    localStorageService.updateCart(newCartProducts);
  } else {
    yield call(userApiService.patchCart, newCartProducts);
  }
}