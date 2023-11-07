import { FC } from 'react';
import styles from './styles.module.css';
import { TaskItem } from 'app/task-item/task-item';
import { TTask } from 'types/tasks';
import { mockTasks } from 'mocks/mockTasks';
import { SortBar } from 'app/sort-bar/sort-bar';

export const TaskList: FC = () => {
  const tasks = mockTasks;
  return (
    <section>
      <SortBar />
      <ul className={styles.tasks}>{tasks && tasks.map((task: TTask) => <TaskItem task={task} key={task.id} />)}</ul>
    </section>
  );
};
