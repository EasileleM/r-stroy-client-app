import { CLEAN_CART, CleanCartAction } from '../types';

export function cleanCartAction(): CleanCartAction {
  return {
    type: CLEAN_CART
  };
}