import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from 'src/services/hooks/hooks';
import { getCurrentTask } from 'src/services/actions/task/task-actions';
import { PageContainer } from 'src/components/PageContainer';
import { Form } from 'src/app/form/form';
import { getCurrentTaskSelector, getTaskErrorSelector } from 'src/constants/selector-creators';

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
