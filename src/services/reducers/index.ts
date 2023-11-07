import { combineReducers } from 'redux';
import { taskReducer, TInitialTaskState } from './taskReducer';

export type TStore = {
  taskList: TInitialTaskState;
};

export const rootReducer = combineReducers({
  // sorting: sortReducer,
  taskList: taskReducer,
});
