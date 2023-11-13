import { TTask } from 'types/tasks';
import { AppDispatch, AppThunk } from 'types/requests';
import request, { requestDelete, requestUpdate } from 'utils/api';
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
export const CHANGE_TASK_IMPORTANCE = 'CHANGE_TASK_IMPORTANCE';
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';

interface IGetTaskRequest {
  readonly type: typeof GET_TASK_REQUEST;
}

interface IGetTaskSuccess {
  readonly type: typeof GET_TASK_SUCCESS;
  payload: TTask;
}

interface IGetTaskFailed {
  readonly type: typeof GET_TASK_FAILED;
  error: Error;
}
interface IDeleteTaskRequest {
  readonly type: typeof DELETE_TASK_REQUEST;
}

interface IDeleteTaskSuccess {
  readonly type: typeof DELETE_TASK_SUCCESS;
  payload: number;
}

interface IDeleteTaskFailed {
  readonly type: typeof DELETE_TASK_FAILED;
  error: Error;
}

interface IUpdateTaskRequest {
  readonly type: typeof UPDATE_TASK_REQUEST;
}

interface IUpdateTaskSuccess {
  readonly type: typeof UPDATE_TASK_SUCCESS;
  id: number;
  payload: TTask;
}

interface IUpdateTaskFailed {
  readonly type: typeof UPDATE_TASK_FAILED;
  error: Error;
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

const getTaskRequest = (): IGetTaskRequest => {
  return {
    type: GET_TASK_REQUEST,
  };
};

const getTaskSuccess = (task: TTask): IGetTaskSuccess => {
  return {
    type: GET_TASK_SUCCESS,
    payload: task,
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
  | IChangeTaskImportance
  | IChangeTaskStatus;

export const deleteTask: AppThunk = (id: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(deleteTaskRequest());
    // request(`${TASK_URL_ENDPOINT}/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
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
    // request(`${TASK_URL_ENDPOINT}/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // })
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
