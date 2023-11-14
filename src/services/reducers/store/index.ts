import { combineReducers } from 'redux';
import { taskReducer } from '../task-reducer/task-reducer';
import { taskListReducer } from '../task-list-reducer/task-list-reducer';

export const rootReducer = combineReducers({
  task: taskReducer,
  taskList: taskListReducer,
});
