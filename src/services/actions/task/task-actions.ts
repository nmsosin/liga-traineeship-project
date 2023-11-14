import {
  IDeleteTaskFailed,
  IDeleteTaskRequest,
  IDeleteTaskSuccess,
  IGetTaskFailed,
  IGetTaskRequest,
  IGetTaskSuccess,
  IResetTask,
  IUpdateTaskFailed,
  IUpdateTaskRequest,
  IUpdateTaskSuccess,
} from './task.types';
import { TTask } from 'types/tasks';
import { AppDispatch, AppThunk } from 'types/requests';
import { requestDelete, requestGetCurrent, requestUpdate } from 'utils/api';
import { TASK_URL_ENDPOINT } from 'constants/urlEndpoints';

export const GET_TASK_REQUEST = 'GET_TASK_REQUEST';
export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
export const GET_TASK_FAILED = 'GET_TASK_FAILED';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILED = 'DELETE_TASK_FAILED';
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';
export const RESET_TASK = 'RESET_TASK';

const getTaskRequest = (): IGetTaskRequest => {
  return {
    type: GET_TASK_REQUEST,
  };
};

const getTaskSuccess = (id: number, task: TTask): IGetTaskSuccess => {
  return {
    type: GET_TASK_SUCCESS,
    payload: task,
    id: id,
  };
};

const getTaskFailed = (error: Error): IGetTaskFailed => {
  return {
    type: GET_TASK_FAILED,
    error: error,
  };
};
const deleteTaskRequest = (): IDeleteTaskRequest => {
  return {
    type: DELETE_TASK_REQUEST,
  };
};

const deleteTaskSuccess = (id: number): IDeleteTaskSuccess => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: id,
  };
};

const deleteTaskFailed = (error: Error): IDeleteTaskFailed => {
  return {
    type: DELETE_TASK_FAILED,
    error: error,
  };
};

const updateTaskRequest = (): IUpdateTaskRequest => {
  return {
    type: UPDATE_TASK_REQUEST,
  };
};

const updateTaskSuccess = (id: number, task: TTask): IUpdateTaskSuccess => {
  return {
    type: UPDATE_TASK_SUCCESS,
    id: id,
    payload: task,
  };
};

const updateTaskFailed = (error: Error): IUpdateTaskFailed => {
  return {
    type: UPDATE_TASK_FAILED,
    error: error,
  };
};

export const resetTask = (): IResetTask => {
  return {
    type: RESET_TASK,
    currentTaskId: null,
    currentTask: null,
  };
};

export const deleteTask: AppThunk = (id: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(deleteTaskRequest());
    requestDelete(`${TASK_URL_ENDPOINT}/${id}`, id, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res) {
          dispatch(deleteTaskSuccess(id));
        } else {
          dispatch(deleteTaskFailed(new Error()));
        }
      })
      .catch((err) => {
        dispatch(deleteTaskFailed(err));
      });
  };
};

export const updateTask: AppThunk = (id: number, task: TTask) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateTaskRequest());
    requestUpdate(`${TASK_URL_ENDPOINT}/${id}`, task, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res) {
          dispatch(updateTaskSuccess(id, task));
        } else {
          dispatch(updateTaskFailed(new Error()));
        }
      })
      .catch((err) => {
        dispatch(updateTaskFailed(err));
      });
  };
};

export const getCurrentTask: AppThunk = (id: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getTaskRequest());
    requestGetCurrent(`${TASK_URL_ENDPOINT}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res) {
          dispatch(getTaskSuccess(id, res));
        } else {
          dispatch(getTaskFailed(new Error()));
        }
      })
      .catch((err) => {
        dispatch(getTaskFailed(err));
      });
  };
};
