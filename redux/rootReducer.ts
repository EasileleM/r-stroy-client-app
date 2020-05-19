import { combineReducers } from 'redux';
import { catalogReducer } from './catalog/catalogReducer';
import { userReducer } from './user/userReducer';

export const rootReducer = combineReducers({
  catalog: catalogReducer,
  user: userReducer
});
