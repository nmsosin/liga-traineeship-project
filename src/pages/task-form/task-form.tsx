import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentTask } from '../../services/actions/task/taskActions';
import { TStore } from '../../services/reducers/store/store.types';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import styles from './styles.module.css';
import { PageContainer } from 'components/PageContainer';
import { Form } from 'app/form/form';

export const TaskForm: FC = () => {
  const { id: taskId } = useParams();
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector((store: TStore) => store.task.currentTask);
  useEffect(() => {
    if (taskId) {
      dispatch(getCurrentTask(taskId));
    }
  }, [dispatch]);

  return (
    <PageContainer>
      <h2 className={styles.formTitle}>{taskId ? 'Edit task' : 'Add new task'}</h2>
      {currentTask && <Form task={currentTask} taskId={Number(taskId)} />}
      {!currentTask && <Form task={null} taskId={Number(null)} />}
    </PageContainer>
  );
};
