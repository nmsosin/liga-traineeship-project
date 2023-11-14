import { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { TStore } from '../../services/reducers/store/store.types';
import { getSortedTasks, getTaskListData } from '../../services/actions/task-list/task-list-actions';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { resetTask } from '../../services/actions/task/task-actions';
import styles from './styles.module.css';
import { TaskItem } from 'app/task-item/task-item';
import { TTask } from 'types/tasks';
import { SearchInput } from 'components/SearchInput';
import { Loader } from 'components/Loader';
import { Pagination } from 'app/pagination/pagination';
import { getAllTasksSelector, getTaskListErrorSelector, getTaskListRequestSelector } from 'constants/selector-creators';

export const TaskList: FC = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<'all' | 'active' | 'done' | 'important' | 'filter'>('all');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTaskListData());
    dispatch(resetTask());
  }, [dispatch]);
  const error = useAppSelector(getTaskListErrorSelector);
  const status = useAppSelector(getTaskListRequestSelector);
  const [isLoading, setIsLoading] = useState(status);
  useEffect(() => {
    setIsLoading(status);
  }, [status]);
  const taskList = useAppSelector(getAllTasksSelector);
  const tasks = useMemo(() => {
    return [...taskList].reverse();
  }, [taskList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksperPage] = useState(10);
  const lastTaskIndex = currentPage * tasksperPage;
  const firstTaskIndex = lastTaskIndex - tasksperPage;
  const currentTasks = tasks.slice(firstTaskIndex, lastTaskIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSort('filter');
    dispatch(getSortedTasks({ name_like: filter }));
  };
  const handleResetClick = () => {
    setFilter('');
    setSort('all');
    dispatch(getTaskListData());
  };
  const handleSortAll = () => {
    setSort('all');
    dispatch(getTaskListData());
  };

  const handleSortActive = () => {
    setSort('active');
    dispatch(getSortedTasks({ isCompleted: false || 'false' || undefined }));
  };

  const handleSortDone = () => {
    setSort('done');
    dispatch(getSortedTasks({ isCompleted: true || 'true' }));
  };

  const handleSortImportant = () => {
    setSort('important');
    dispatch(getSortedTasks({ isImportant: true || 'true' }));
  };
  return (
    <section>
      <form className={styles.searchForm} action="submit" onSubmit={handleSearchSubmit}>
        <SearchInput onChange={setFilter} onReset={handleResetClick} value={filter} />

        <button className={styles.findButton} type={'submit'} disabled={filter.length === 0}>
          Find
        </button>
      </form>
      <nav className={styles.sortBar}>
        <button
          onClick={handleSortAll}
          className={`${styles.sortButton} ${sort === 'all' ? styles.active : ''}`}
          type={'button'}>
          All
        </button>
        <button
          onClick={handleSortActive}
          className={`${styles.sortButton} ${sort === 'active' ? styles.active : ''}`}
          type={'button'}>
          Active
        </button>
        <button
          onClick={handleSortDone}
          className={`${styles.sortButton} ${sort === 'done' ? styles.active : ''}`}
          type={'button'}>
          Done
        </button>
        <button
          onClick={handleSortImportant}
          className={`${styles.sortButton} ${sort === 'important' ? styles.active : ''}`}
          type={'button'}>
          Important
        </button>
      </nav>
      <div className={isLoading ? styles.wrapper : ''}>
        {error && (
          <div className={styles.errorContainer}>
            <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
            <p className={styles.errorDescription}>{error.message}</p>
          </div>
        )}
        <Loader isLoading={isLoading} variant={'circle'}>
          <ul className={styles.tasks}>
            {currentTasks &&
              currentTasks.map((task: TTask) => <TaskItem task={task} sort={sort} filter={filter} key={task.id} />)}
          </ul>
        </Loader>
      </div>
      <Pagination tasksPerPage={tasksperPage} totalTasks={tasks.length} paginate={paginate} currentPage={currentPage} />
    </section>
  );
};
