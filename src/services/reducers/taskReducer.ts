import {
  CHANGE_TASK_IMPORTANCE,
  CHANGE_TASK_STATUS,
  DELETE_TASK_FAILED,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASK_FAILED,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  TTaskActions,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from '../actions/taskActions';
import { TTask } from 'types/tasks';

export type TInitialTaskState = {
  deleteTaskRequest: boolean;
  deleteTaskSuccess: boolean;
  deleteTaskFailed: boolean;
  updateTaskRequest: boolean;
  updateTaskSuccess: boolean;
  updateTaskFailed: boolean;
  currentTask: TTask | null;
  currentTaskId: number | null;
  tasks: TTask[];
  error: Error | null;
};

export const initialTaskState: TInitialTaskState = {
  deleteTaskRequest: false,
  deleteTaskSuccess: false,
  deleteTaskFailed: false,
  updateTaskRequest: false,
  updateTaskSuccess: false,
  updateTaskFailed: false,
  currentTask: null,
  currentTaskId: null,
  tasks: [],
  error: null,
};

export const taskReducer = (state = initialTaskState, action: TTaskActions) => {
  switch (action.type) {
    case GET_TASK_REQUEST: {
      return {
        ...state,
        getTaskRequest: true,
        getTaskFailed: false,
      };
    }
    case GET_TASK_SUCCESS: {
      return {
        ...state,
        getTaskRequest: false,
        getTaskFailed: false,
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
    case CHANGE_TASK_IMPORTANCE: {
      const stateCopy = { ...state };
      const task = stateCopy.tasks.find((task) => {
        return Number(task.id) === Number(action.id);
      });
      if (task) {
        task.isImportant = action.payload;
      }
      return {
        ...stateCopy,
      };
    }
    case CHANGE_TASK_STATUS: {
      const stateCopy = { ...state };
      const task = stateCopy.tasks.find((task) => {
        return Number(task.id) === Number(action.id);
      });
      if (task) {
        task.isCompleted = action.payload;
      }
      return {
        ...stateCopy,
      };
    }
    default: {
      return state;
    }
  }
};
