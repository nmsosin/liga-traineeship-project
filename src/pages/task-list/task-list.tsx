import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
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
import {
  StyledButton,
  StyledErrorDescription,
  StyledErrorTitle,
  StyledInvalidInputText,
  StyledResetButton,
  StyledSearchForm,
  StyledSortBar,
  StyledSortTab,
  StyledTaskList,
  StyledTextInput,
} from 'src/pages/task-list/styled.task-list';

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
  const [tasksPerPage] = useState(10);
  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
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
      <StyledSearchForm action="submit" onSubmit={handleSubmit(onSearchSubmit)}>
        <div>
          <Controller
            control={control}
            name="filter"
            render={({ field, fieldState: { error } }) => (
              <Box position={'relative'}>
                <StyledTextInput
                  value={field.value}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder={'> search'}
                />
                <StyledResetButton onClick={() => reset()}>
                  <span>X</span>
                </StyledResetButton>
                <StyledInvalidInputText>{error?.message}</StyledInvalidInputText>
              </Box>
            )}
          />
        </div>

        <StyledButton type={'submit'} disabled={watch('filter').length === 0}>
          Find
        </StyledButton>
      </StyledSearchForm>
      <StyledSortBar value={sort} centered>
        <StyledSortTab onClick={handleSortAll} onChange={() => setSort('all')} value={'all'} label={'All'} />
        <StyledSortTab
          onClick={handleSortActive}
          onChange={() => setSort('active')}
          value={'active'}
          label={'Active'}
        />
        <StyledSortTab onClick={handleSortDone} onChange={() => setSort('done')} value={'done'} label={'Done'} />
        <StyledSortTab
          onClick={handleSortImportant}
          onChange={() => setSort('important')}
          value={'important'}
          label={'Important'}
        />
      </StyledSortBar>
      <Box display="flex" justifyContent="center" height={'50%'} margin={isLoading ? '100px 0 60px' : 0}>
        {error && (
          <Box display="flex" flexDirection="column" alignItems="center" gap={'40px'} margin={'80px 0 40px'}>
            <StyledErrorTitle>Oops! Something went wrong</StyledErrorTitle>
            <StyledErrorDescription>{error.message}</StyledErrorDescription>
          </Box>
        )}
        <Loader isLoading={isLoading} variant={'circle'}>
          {!error && currentTasks && (
            <StyledTaskList>
              {currentTasks.map((task: TTask) => (
                <TaskItem task={task} sort={sort} filter={watch('filter')} key={task.id} />
              ))}
            </StyledTaskList>
          )}
        </Loader>
      </Box>
      <Pagination tasksPerPage={tasksPerPage} totalTasks={tasks.length} paginate={paginate} currentPage={currentPage} />
    </section>
  );
};
