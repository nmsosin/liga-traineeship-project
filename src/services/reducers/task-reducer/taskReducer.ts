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
} from '../../actions/task/taskActions';
import { TTaskActions } from '../../actions/task/task.types';
import { TInitialTaskState } from './task-reducer.types';

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
      };
    }
    default: {
      return state;
    }
  }
};
