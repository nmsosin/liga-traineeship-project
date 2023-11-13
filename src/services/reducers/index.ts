import { combineReducers } from 'redux';
import { taskReducer, TInitialTaskState } from './taskReducer';
import { taskListReducer, TInitialTaskListState } from './taskListReducer';

export type TStore = {
  taskList: TInitialTaskListState;
  task: TInitialTaskState;
};

export const rootReducer = combineReducers({
  task: taskReducer,
  taskList: taskListReducer,
});
