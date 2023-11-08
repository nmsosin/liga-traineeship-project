import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/reducers';
import styles from './styles.module.css';
import { TaskItem } from 'app/task-item/task-item';
import { TTask } from 'types/tasks';
import { SearchInput } from 'components/SearchInput';

export const TaskList: FC = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<'all' | 'active' | 'done' | 'important' | 'filter'>('all');
  const tasks = useSelector((store: TStore) => store.taskList.tasks);
  const filteredTasks = tasks.filter((task) => {
    switch (sort) {
      case 'active':
        return !task.isCompleted;
      case 'done':
        return task.isCompleted;
      case 'important':
        return task.isImportant;
      case 'filter':
        return task.name.toLowerCase() === filter.toLowerCase();
      default:
        return task;
    }
  });
  const handleSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSort('filter');
  };
  const handleResetClick = () => {
    setFilter('');
    setSort('all');
    console.log(sort);
  };
  return (
    <section>
      <form className={styles.searchForm} action="submit" onSubmit={handleSearchSubmit}>
        <SearchInput onChange={setFilter} onReset={handleResetClick} value={filter} />

        <button className={styles.findButton} type={'submit'}>
          Find
        </button>
      </form>
      <nav className={styles.sortBar}>
        <button
          onClick={() => setSort('all')}
          className={`${styles.sortButton} ${sort === 'all' ? styles.active : ''}`}
          type={'button'}>
          All
        </button>
        <button
          onClick={() => setSort('active')}
          className={`${styles.sortButton} ${sort === 'active' ? styles.active : ''}`}
          type={'button'}>
          Active
        </button>
        <button
          onClick={() => setSort('done')}
          className={`${styles.sortButton} ${sort === 'done' ? styles.active : ''}`}
          type={'button'}>
          Done
        </button>
        <button
          onClick={() => setSort('important')}
          className={`${styles.sortButton} ${sort === 'important' ? styles.active : ''}`}
          type={'button'}>
          Important
        </button>
      </nav>
      <ul className={styles.tasks}>
        {filteredTasks && filteredTasks.map((task: TTask) => <TaskItem task={task} key={task._id} />)}
      </ul>
    </section>
  );
};
