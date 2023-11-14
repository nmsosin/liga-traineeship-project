import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TTaskListActions } from '../services/actions/task-list/task-list.types';
import { store } from '../services/store/store';
import { TTaskActions } from '../services/actions/task/task.types';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TTaskListActions | TTaskActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;
