import { TTask } from 'types/tasks';

export const mockTasks: TTask[] = [
  {
    name: 'Task 1',
    info: 'This is the 1st task',
    isImportant: true,
    isCompleted: false,
    id: 1,
  },
  {
    name: 'Task 2',
    info: 'This is the 2nd task',
    isImportant: false,
    isCompleted: true,
    id: 2,
  },
  {
    name: 'Task 3',
    info: 'This is the 3rd task',
    isImportant: false,
    isCompleted: false,
    id: 3,
  },
];
