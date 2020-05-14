import { CATALOG_ERROR } from '../types';

export function catalogErrorAction(hasError) {
  return {
    type: CATALOG_ERROR,
    payload: hasError
  };
}