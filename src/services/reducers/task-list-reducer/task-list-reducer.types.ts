import { TTask } from 'types/tasks';

export type TInitialTaskListState = {
  taskListRequest: boolean;
  taskListFailed: boolean;
  tasks: TTask[];
  addTaskRequest: boolean;
  addTaskFailed: boolean;
  newTask: TTask | null;
};
