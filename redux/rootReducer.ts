import { combineReducers } from 'redux';
import { catalogReducer } from './catalog/catalogReducer';

export const rootReducer = combineReducers({
  catalog: catalogReducer
});
