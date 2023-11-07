import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/reducers';
import styles from './styles.module.css';
import { TaskItem } from 'app/task-item/task-item';
import { TTask } from 'types/tasks';
import { SortBar } from 'app/sort-bar/sort-bar';

export const TaskList: FC = () => {
  const tasks = useSelector((store: TStore) => store.taskList.tasks);
  console.log(tasks);
  return (
    <section>
      <SortBar />
      <ul className={styles.tasks}>{tasks && tasks.map((task: TTask) => <TaskItem task={task} key={task._id} />)}</ul>
    </section>
  );
};
