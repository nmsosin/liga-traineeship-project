import { TTask } from 'types/tasks';
import request from 'utils/api';
import { AppDispatch, AppThunk } from 'types/requests';
import { TASK_LIST_URL_ENDPOINT } from 'constants/urlEndpoints';

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAILED = 'GET_TASKS_FAILED';
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILED = 'ADD_TASK_FAILED';

interface IAddTaskRequest {
  readonly type: typeof ADD_TASK_REQUEST;
}

interface IAddTaskSuccess {
  readonly type: typeof ADD_TASK_SUCCESS;
  payload: TTask;
}

interface IAddTaskFailed {
  readonly type: typeof ADD_TASK_FAILED;
  error: Error;
}

interface IGetTasksRequest {
  readonly type: typeof GET_TASKS_REQUEST;
}

interface IGetTasksSuccess {
  readonly type: typeof GET_TASKS_SUCCESS;
  payload: TTask[];
}

interface IGetTasksFailed {
  readonly type: typeof GET_TASKS_FAILED;
  error: Error;
}

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

export type TTaskListActions =
  | IGetTasksRequest
  | IGetTasksSuccess
  | IGetTasksFailed
  | IAddTaskRequest
  | IAddTaskSuccess
  | IAddTaskFailed;

export const getTaskListData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getTasksRequest());
    request(TASK_LIST_URL_ENDPOINT)
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
    request(TASK_LIST_URL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
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
