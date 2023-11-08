import {
  ADD_TASK,
  CHANGE_TASK_IMPORTANCE,
  CHANGE_TASK_STATUS,
  DELETE_TASK,
  TTaskActions,
  UPDATE_TASK,
} from '../actions/taskActions';
import { TTask } from 'types/tasks';
import { mockTasks } from 'mocks/mockTasks';

export type TInitialTaskState = {
  tasks: TTask[];
};

export const initialTaskState: TInitialTaskState = {
  tasks: mockTasks,
};

export const taskReducer = (state = initialTaskState, action: TTaskActions) => {
  switch (action.type) {
    case ADD_TASK: {
      const stateCopy = { ...state };
      stateCopy.tasks.push(action.payload);
      return {
        ...stateCopy,
      };
    }
    case UPDATE_TASK: {
      const stateCopy = { ...state };
      const task = stateCopy.tasks.find((task) => {
        return task._id === action.id;
      });
      if (task) {
        task.name = action.payload.name;
        task.info = action.payload.info;
        task.isImportant = action.payload.isImportant;
      }
      return {
        ...stateCopy,
      };
    }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          return task._id !== action.id;
        }),
      };
    case CHANGE_TASK_IMPORTANCE: {
      const stateCopy = { ...state };
      const task = stateCopy.tasks.find((task) => {
        return task._id === action.id;
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
        return task._id === action.id;
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
