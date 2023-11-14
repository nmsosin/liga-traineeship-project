import {
  ADD_TASK_FAILED,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  GET_TASKS_FAILED,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
} from '../../actions/task-list/taskListActions';
import { TTaskListActions } from '../../actions/task-list/task-list.types';
import { TInitialTaskListState } from './task-list-reducer.types';

export const initialTaskListState: TInitialTaskListState = {
  taskListRequest: false,
  taskListFailed: false,
  tasks: [],
  addTaskRequest: false,
  addTaskFailed: false,
  newTask: null,
};

export const taskListReducer = (state = initialTaskListState, action: TTaskListActions) => {
  switch (action.type) {
    case GET_TASKS_REQUEST: {
      return {
        ...state,
        taskListRequest: true,
        taskListFailed: false,
      };
    }
    case GET_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        taskListRequest: false,
        taskListFailed: false,
      };
    }
    case GET_TASKS_FAILED: {
      return {
        ...state,
        taskListRequest: false,
        taskListFailed: true,
      };
    }
    case ADD_TASK_REQUEST: {
      return {
        ...state,
        addTaskRequest: true,
        addTaskFailed: false,
      };
    }
    case ADD_TASK_SUCCESS: {
      return {
        ...state,
        newTask: action.payload,
        addTaskRequest: false,
        addTaskFailed: false,
      };
    }
    case ADD_TASK_FAILED: {
      return {
        ...state,
        addTaskRequest: false,
        addTaskFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
