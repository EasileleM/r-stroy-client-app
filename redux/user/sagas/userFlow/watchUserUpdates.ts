import { all } from 'redux-saga/effects';
import { watchCartUpdates } from '../cart/watchCartUpdates';
import { watchFavoritesUpdates } from '../favorites/watchFavoritesUpdates';
import { watchOrdersUpdates } from '../orders/watchOrderUpdates';
import { watchCredentialsUpdates } from './watchCredentialsUpdates';
import { watchPersonalDataUpdates } from './watchPersonalDataUpdates';

export function* watchUserUpdates() {
  yield all([
    watchPersonalDataUpdates(),
    watchCredentialsUpdates(),
    watchCartUpdates(),
    watchFavoritesUpdates(),
    watchOrdersUpdates()
  ]);
}
