import { TInitialTaskState } from 'src/services/reducers/task-reducer/task-reducer.types';
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
} from 'src/services/actions/task/task-actions';
import { TTaskActions } from 'src/services/actions/task/task.types';

export const initialTaskState: TInitialTaskState = {
  getTaskRequest: false,
  getTaskSuccess: false,
  getTaskFailed: false,
  deleteTaskRequest: false,
  deleteTaskSuccess: false,
  deleteTaskFailed: false,
  updateTaskRequest: false,
  updateTaskSuccess: false,
  updateTaskFailed: false,
  currentTask: null,
  currentTaskId: null,
  error: null,
};

export const taskReducer = (state = initialTaskState, action: TTaskActions) => {
  switch (action.type) {
    case GET_TASK_REQUEST: {
      return {
        ...state,
        getTaskRequest: true,
        getTaskFailed: false,
        currentTaskId: null,
        currentTask: null,
        error: null,
      };
    }
    case GET_TASK_SUCCESS: {
      return {
        ...state,
        getTaskRequest: false,
        getTaskFailed: false,
        currentTaskId: action.id,
        currentTask: action.payload,
      };
    }
    case GET_TASK_FAILED: {
      return {
        ...state,
        getTaskRequest: false,
        getTaskFailed: true,
        error: action.error,
      };
    }
    case DELETE_TASK_REQUEST: {
      return {
        ...state,
        deleteTaskRequest: true,
        deleteTaskFailed: false,
        error: null,
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        deleteTaskRequest: false,
        deleteTaskFailed: false,
        currentTaskId: action.payload,
      };
    }
    case DELETE_TASK_FAILED: {
      return {
        ...state,
        deleteTaskRequest: false,
        deleteTaskFailed: true,
        error: action.error,
      };
    }
    case UPDATE_TASK_REQUEST: {
      return {
        ...state,
        updateTaskRequest: true,
        updateTaskFailed: false,
        error: null,
      };
    }
    case UPDATE_TASK_SUCCESS: {
      return {
        ...state,
        updateTaskRequest: false,
        updateTaskFailed: false,
        currentTaskId: action.id,
      };
    }
    case UPDATE_TASK_FAILED: {
      return {
        ...state,
        updateTaskRequest: false,
        updateTaskFailed: true,
        error: action.error,
      };
    }
    case RESET_TASK: {
      return {
        ...state,
        currentTask: null,
        currentTaskId: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
