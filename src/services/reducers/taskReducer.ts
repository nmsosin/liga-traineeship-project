import { ADD_TASK, DELETE_TASK, TTaskActions } from '../actions/taskActions';
import { TTask } from 'types/tasks';
import { mockTasks } from 'mocks/mockTasks';

export type TInitialTaskState = {
  tasks: TTask[];
  newTask: TTask | null;
};

export const initialTaskState: TInitialTaskState = {
  tasks: mockTasks,
  newTask: null,
};

export const taskReducer = (state = initialTaskState, action: TTaskActions) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        newTask: action.payload,
      };
    case DELETE_TASK: {
      const stateCopy = { ...state };
      const filteredTasks = stateCopy.tasks.filter((task) => {
        console.log(action.payload);
        return task._id !== action.payload;
      });
      return { ...stateCopy, tasks: filteredTasks };
    }
    default: {
      return state;
    }
  }
};
