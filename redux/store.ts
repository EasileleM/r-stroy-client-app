import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

export const store: Store = createStore(rootReducer, applyMiddleware(thunk));
