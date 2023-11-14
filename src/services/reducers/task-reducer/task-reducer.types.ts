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
  error: Error | null;
};
