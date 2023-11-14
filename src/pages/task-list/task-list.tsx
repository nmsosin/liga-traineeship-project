import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useSearchParams } from 'react-router-dom';
import { SearchSubmitForm } from './search-form-validation.types';
import styles from './styles.module.css';
import { validationSchema } from './search-form-validation';
import { getSortedTasks, getTaskListData } from 'src/services/actions/task-list/task-list-actions';
import { useAppDispatch, useAppSelector } from 'src/services/hooks/hooks';
import { resetTask } from 'src/services/actions/task/task-actions';
import {
  getAllTasksSelector,
  getTaskListErrorSelector,
  getTaskListRequestSelector,
} from 'src/constants/selector-creators';
import { TaskItem } from 'src/app/task-item/task-item';
import { TTask } from 'src/types/tasks';
import { Loader } from 'src/components/Loader';
import { Pagination } from 'src/app/pagination/pagination';

export const TaskList: FC = () => {
  const defaultValues = { filter: '' };
  const { watch, handleSubmit, control, reset, setValue } = useForm<SearchSubmitForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
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
  const [_, setSearchParams] = useSearchParams('');

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onSearchSubmit = (data: SearchSubmitForm) => {
    setSort('filter');
    setSearchParams({ name: data.filter });
    dispatch(getSortedTasks({ name_like: data.filter }));
    reset();
  };

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('filter', evt.target.value);
  };
  const handleSortAll = () => {
    setSort('all');
    setSearchParams('');
    dispatch(getTaskListData());
  };

  const handleSortActive = () => {
    setSort('active');
    setSearchParams({ isCompleted: 'false' });
    dispatch(getSortedTasks({ isCompleted: false || 'false' || undefined }));
  };

  const handleSortDone = () => {
    setSort('done');
    setSearchParams({ isCompleted: 'true' });
    dispatch(getSortedTasks({ isCompleted: true || 'true' }));
  };

  const handleSortImportant = () => {
    setSort('important');
    setSearchParams({ isImportant: 'true' });
    dispatch(getSortedTasks({ isImportant: true || 'true' }));
  };
  return (
    <section>
      <form className={styles.searchForm} action="submit" onSubmit={handleSubmit(onSearchSubmit)}>
        <div>
          <Controller
            control={control}
            name="filter"
            render={({ field, fieldState: { error } }) => (
              <div className={styles.searchBar}>
                <input
                  value={field.value}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder={'> search'}
                  className={`${styles.searchInput} ${error?.message ? 'is-invalid' : ''}`}
                />
                <button type={'reset'} className={styles.resetButton} onClick={() => reset()}>
                  <span className={styles.resetIcon}>X</span>
                </button>
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>

        <button className={styles.findButton} type={'submit'} disabled={watch('filter').length === 0}>
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
              currentTasks.map((task: TTask) => (
                <TaskItem task={task} sort={sort} filter={watch('filter')} key={task.id} />
              ))}
          </ul>
        </Loader>
      </div>
      <Pagination tasksPerPage={tasksperPage} totalTasks={tasks.length} paginate={paginate} currentPage={currentPage} />
    </section>
  );
};
