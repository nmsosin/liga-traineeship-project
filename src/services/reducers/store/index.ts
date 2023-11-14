import { combineReducers } from 'redux';
import { taskReducer } from '../task-reducer/taskReducer';
import { taskListReducer } from '../task-list-reducer/taskListReducer';

export const rootReducer = combineReducers({
  task: taskReducer,
  taskList: taskListReducer,
});
