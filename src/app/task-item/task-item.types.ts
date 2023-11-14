import { TTask } from 'types/tasks';

export type TTaskItemProps = {
  task: TTask;
  sort: string;
  filter?: string;
};
