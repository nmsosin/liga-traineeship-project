import { combineReducers } from 'redux';
import { taskReducer } from 'src/services/reducers/task-reducer/task-reducer';
import { taskListReducer } from 'src/services/reducers/task-list-reducer/task-list-reducer';

export const rootReducer = combineReducers({
  task: taskReducer,
  taskList: taskListReducer,
});
