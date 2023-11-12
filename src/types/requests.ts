import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TTaskListActions } from '../services/actions/taskListActions';
import { store } from '../services/store/store';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TTaskListActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;
