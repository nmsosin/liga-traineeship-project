import { TTask } from 'types/tasks';

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_TASK_IMPORTANCE = 'CHANGE_TASK_IMPORTANCE';
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';

interface IAddTask {
  readonly type: typeof ADD_TASK;
  payload: TTask;
}

interface IUpdateTask {
  readonly type: typeof UPDATE_TASK;
  id: string;
  payload: TTask;
}

interface IDeleteTask {
  readonly type: typeof DELETE_TASK;
  id: string;
}

interface IChangeTaskImportance {
  readonly type: typeof CHANGE_TASK_IMPORTANCE;
  id: string;
  payload: boolean;
}

interface IChangeTaskStatus {
  readonly type: typeof CHANGE_TASK_STATUS;
  id: string;
  payload: boolean;
}

export type TTaskActions = IAddTask | IUpdateTask | IDeleteTask | IChangeTaskImportance | IChangeTaskStatus;
