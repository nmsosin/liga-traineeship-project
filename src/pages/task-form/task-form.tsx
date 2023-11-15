import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from 'src/services/hooks/hooks';
import { getCurrentTask } from 'src/services/actions/task/task-actions';
import { PageContainer } from 'src/components/PageContainer';
import { Form } from 'src/app/form/form';
import { getCurrentTaskSelector, getTaskErrorSelector } from 'src/constants/selector-creators';
import { StyledErrorDescription, StyledErrorTitle, StyledFormTitle } from 'pages/task-form/styled.task-form';

export const TaskForm: FC = () => {
  const { id: taskId } = useParams();
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(getCurrentTaskSelector);
  const error = useAppSelector(getTaskErrorSelector);
  useEffect(() => {
    if (taskId) {
      dispatch(getCurrentTask(taskId));
    }
  }, [dispatch]);

  return (
    <PageContainer>
      <StyledFormTitle>{taskId ? 'Edit task' : 'Add new task'}</StyledFormTitle>
      {!error && currentTask && <Form task={currentTask} taskId={Number(taskId)} />}
      {!error && !currentTask && <Form task={null} taskId={Number(null)} />}
      {error && (
        <Box display="flex" flexDirection={'column'} alignItems={'center'} gap={'40px'} padding={'80px 0 40px'}>
          <StyledErrorTitle>Oops! Something went wrong</StyledErrorTitle>
          <StyledErrorDescription>{error.message}</StyledErrorDescription>
        </Box>
      )}
    </PageContainer>
  );
};
