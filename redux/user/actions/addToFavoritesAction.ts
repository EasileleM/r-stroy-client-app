import { Product } from '../../../interfaces/Product';
import { ADD_TO_FAVORITES, AddToFavoritesAction } from '../types';

export function addToFavoritesAction(product: Product): AddToFavoritesAction {
  return {
    type: ADD_TO_FAVORITES,
    payload: product
  };
}