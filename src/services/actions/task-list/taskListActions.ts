import {
  IAddTaskFailed,
  IAddTaskRequest,
  IAddTaskSuccess,
  IGetTasksFailed,
  IGetTasksRequest,
  IGetTasksSuccess,
} from './task-list.types';
import { TTask } from 'types/tasks';
import { requestAdd, requestGetAll } from 'utils/api';
import { AppDispatch, AppThunk } from 'types/requests';
import { TASK_LIST_URL_ENDPOINT } from 'constants/urlEndpoints';

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAILED = 'GET_TASKS_FAILED';
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILED = 'ADD_TASK_FAILED';

const getTasksRequest = (): IGetTasksRequest => {
  return {
    type: GET_TASKS_REQUEST,
  };
};

const getTasksSuccess = (tasks: TTask[]): IGetTasksSuccess => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: tasks,
  };
};

const getTasksFailed = (error: Error): IGetTasksFailed => {
  return {
    type: GET_TASKS_FAILED,
    error: error,
  };
};

const addTaskRequest = (): IAddTaskRequest => {
  return {
    type: ADD_TASK_REQUEST,
  };
};

const addTaskSuccess = (task: TTask): IAddTaskSuccess => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: task,
  };
};

const addTaskFailed = (error: Error): IAddTaskFailed => {
  return {
    type: ADD_TASK_FAILED,
    error: error,
  };
};

export const getTaskListData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getTasksRequest());
    requestGetAll(TASK_LIST_URL_ENDPOINT)
      .then((res: any) => {
        if (res) {
          dispatch(getTasksSuccess(res));
        } else {
          dispatch(getTasksFailed(new Error()));
        }
      })
      .catch((err) => {
        dispatch(getTasksFailed(err));
      });
  };
};

export const getSortedTasks: AppThunk = (params) => {
  return function (dispatch: AppDispatch) {
    dispatch(getTasksRequest());
    requestGetAll(TASK_LIST_URL_ENDPOINT, { params })
      .then((res) => {
        if (res) {
          dispatch(getTasksSuccess(res));
        } else {
          dispatch(getTasksFailed(new Error()));
        }
      })
      .catch((err) => {
        dispatch(getTasksFailed(err));
      });
  };
};

export const addNewTask: AppThunk = (newTask: TTask) => {
  return function (dispatch: AppDispatch) {
    dispatch(addTaskRequest());
    requestAdd(TASK_LIST_URL_ENDPOINT, newTask, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res) {
          dispatch(addTaskSuccess(res.newTask));
        } else {
          dispatch(addTaskFailed(new Error()));
        }
      })
      .catch((err) => {
        dispatch(addTaskFailed(err));
      });
  };
};
