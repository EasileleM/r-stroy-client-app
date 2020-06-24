import { CHANGE_PAGE, ChangePageAction } from '../types';

export function changePageAction(page: number): ChangePageAction {
  return {
    type: CHANGE_PAGE,
    payload: page
  };
}