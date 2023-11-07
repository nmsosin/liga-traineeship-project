import { TTask } from 'types/tasks';

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

interface IAddTask {
  readonly type: typeof ADD_TASK;
  payload: TTask;
}

interface IDeleteTask {
  readonly type: typeof DELETE_TASK;
  payload: number;
}

export type TTaskActions = IAddTask | IDeleteTask;
