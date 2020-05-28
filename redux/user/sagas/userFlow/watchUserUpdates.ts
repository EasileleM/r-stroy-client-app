import { all } from 'redux-saga/effects';
import { watchCartUpdates } from './watchCartUpdates';
import { watchFavoritesUpdates } from './watchFavoritesUpdates';

export function* watchUserUpdates() {
  yield all([
    watchCartUpdates(),
    watchFavoritesUpdates()
  ]);
}
