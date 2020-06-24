import { all } from 'redux-saga/effects';
import { watchCartUpdates } from './watchCartUpdates';
import { watchFavoritesUpdates } from './watchFavoritesUpdates';
import { watchOrdersUpdate } from './watchOrdersUpdate';

export function* watchUserUpdates() {
  yield all([
    watchCartUpdates(),
    watchFavoritesUpdates(),
    watchOrdersUpdate()
  ]);
}
