import { TStore } from 'src/services/reducers/store/store.types';

export const getUpdateTaskRequestSelector = (store: TStore) => store.task.updateTaskRequest;
export const getDeleteTaskRequestSelector = (store: TStore) => store.task.deleteTaskRequest;
export const getTaskRequestSelector = (store: TStore) => store.task.getTaskRequest;
export const getCurrentTaskSelector = (store: TStore) => store.task.currentTask;
export const getTaskListRequestSelector = (store: TStore) => store.taskList.taskListRequest;
export const getAllTasksSelector = (store: TStore) => store.taskList.tasks;
export const getTaskErrorSelector = (store: TStore) => store.task.error;
export const getTaskListErrorSelector = (store: TStore) => store.taskList.error;
