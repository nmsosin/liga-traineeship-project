import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentTask } from '../../services/actions/task/task-actions';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import styles from './styles.module.css';
import { PageContainer } from 'components/PageContainer';
import { Form } from 'app/form/form';
import { getCurrentTaskSelector, getTaskErrorSelector } from 'constants/selector-creators';

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
      <h2 className={styles.formTitle}>{taskId ? 'Edit task' : 'Add new task'}</h2>
      {!error && currentTask && <Form task={currentTask} taskId={Number(taskId)} />}
      {!error && !currentTask && <Form task={null} taskId={Number(null)} />}
      {error && (
        <div className={styles.errorContainer}>
          <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
          <p className={styles.errorDescription}>{error.message}</p>
        </div>
      )}
    </PageContainer>
  );
};
