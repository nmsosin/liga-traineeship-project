import { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { SearchInput } from 'components/SearchInput';
import { TextField } from 'components/TextField';
import { TaskItem } from 'app/task-item/task-item';
import { TTask } from 'types/tasks';
import { mockTasks } from 'mocks/mockTasks';

export const TaskList: FC = () => {
  const { id } = useParams();
  const tasks = mockTasks;
  return (
    <section>
      <ul className={styles.tasks}>{tasks && tasks.map((task: TTask) => <TaskItem task={task} key={task.id} />)}</ul>
    </section>
  );
};
