import { TInitialTaskListState } from 'src/services/reducers/task-list-reducer/task-list-reducer.types';
import { TInitialTaskState } from 'src/services/reducers/task-reducer/task-reducer.types';

export type TStore = {
  taskList: TInitialTaskListState;
  task: TInitialTaskState;
};
