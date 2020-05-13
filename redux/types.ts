import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';
import { rootReducer } from './rootReducer';
import { store } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch =
  typeof store.dispatch & ThunkDispatch<RootState, void, AnyAction>;