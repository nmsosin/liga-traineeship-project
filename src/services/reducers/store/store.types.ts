import { TInitialTaskListState } from '../task-list-reducer/task-list-reducer.types';
import { TInitialTaskState } from '../task-reducer/task-reducer.types';

export type TStore = {
  taskList: TInitialTaskListState;
  task: TInitialTaskState;
};
