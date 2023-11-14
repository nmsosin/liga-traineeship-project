import {
  DELETE_TASK_FAILED,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASK_FAILED,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  RESET_TASK,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from './task-actions';
import { TTask } from 'types/tasks';

export interface IGetTaskRequest {
  readonly type: typeof GET_TASK_REQUEST;
}

export interface IGetTaskSuccess {
  readonly type: typeof GET_TASK_SUCCESS;
  id: number;
  payload: TTask;
}

export interface IGetTaskFailed {
  readonly type: typeof GET_TASK_FAILED;
  error: Error;
}
export interface IDeleteTaskRequest {
  readonly type: typeof DELETE_TASK_REQUEST;
}

export interface IDeleteTaskSuccess {
  readonly type: typeof DELETE_TASK_SUCCESS;
  payload: number;
}

export interface IDeleteTaskFailed {
  readonly type: typeof DELETE_TASK_FAILED;
  error: Error;
}

export interface IUpdateTaskRequest {
  readonly type: typeof UPDATE_TASK_REQUEST;
}

export interface IUpdateTaskSuccess {
  readonly type: typeof UPDATE_TASK_SUCCESS;
  id: number;
  payload: TTask;
}

export interface IUpdateTaskFailed {
  readonly type: typeof UPDATE_TASK_FAILED;
  error: Error;
}

export interface IResetTask {
  readonly type: typeof RESET_TASK;
  currentTaskId: null;
  currentTask: null;
}

export type TTaskActions =
  | IGetTaskRequest
  | IGetTaskSuccess
  | IGetTaskFailed
  | IDeleteTaskRequest
  | IDeleteTaskSuccess
  | IDeleteTaskFailed
  | IUpdateTaskRequest
  | IUpdateTaskSuccess
  | IUpdateTaskFailed
  | IResetTask;
