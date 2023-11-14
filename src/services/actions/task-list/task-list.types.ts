import {
  ADD_TASK_FAILED,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  GET_TASKS_FAILED,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
} from './task-list-actions';
import { TTask } from 'types/tasks';

export interface IAddTaskRequest {
  readonly type: typeof ADD_TASK_REQUEST;
}

export interface IAddTaskSuccess {
  readonly type: typeof ADD_TASK_SUCCESS;
  payload: TTask;
}

export interface IAddTaskFailed {
  readonly type: typeof ADD_TASK_FAILED;
  error: Error;
}

export interface IGetTasksRequest {
  readonly type: typeof GET_TASKS_REQUEST;
}

export interface IGetTasksSuccess {
  readonly type: typeof GET_TASKS_SUCCESS;
  payload: TTask[];
}

export interface IGetTasksFailed {
  readonly type: typeof GET_TASKS_FAILED;
  error: Error;
}

export type TTaskListActions =
  | IGetTasksRequest
  | IGetTasksSuccess
  | IGetTasksFailed
  | IAddTaskRequest
  | IAddTaskSuccess
  | IAddTaskFailed;
