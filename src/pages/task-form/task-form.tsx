import { ChangeEvent, FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCurrentTask, updateTask } from '../../services/actions/task/taskActions';
import { TStore } from '../../services/reducers/store/store.types';
import { addNewTask, getTaskListData } from '../../services/actions/task-list/taskListActions';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import styles from './styles.module.css';
import { PageContainer } from 'components/PageContainer';
import { validationSchema } from 'pages/task-form/task-form-validation';
import { TaskSubmitForm } from 'pages/task-form/task-form-validation.types';

export const TaskForm: FC = () => {
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (taskId) {
      dispatch(getCurrentTask(taskId));
    }
  }, [taskId]);
  const currentTask = useAppSelector((store: TStore) => store.task.currentTask);

  const defaultValues: TaskSubmitForm =
    taskId && currentTask !== null
      ? currentTask
      : {
          name: '',
          info: '',
          isImportant: false,
          isCompleted: false,
        };
  const { watch, handleSubmit, control, setValue } = useForm<TaskSubmitForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('name', evt.target.value);
  };
  const handleInfoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('info', evt.target.value);
  };

  const handleImportanceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', evt.target.checked);
  };
  const handleStatusChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isCompleted', evt.target.checked);
  };
  const onSubmit = (data: TaskSubmitForm) => {
    if (taskId) {
      dispatch(updateTask(taskId, JSON.stringify(data, null, 2)));
    } else {
      dispatch(addNewTask(JSON.stringify(data, null, 2)));
    }
    dispatch(getTaskListData());
    navigate(-1);
  };
  return (
    <PageContainer>
      <h2 className={styles.formTitle}>{taskId ? 'Edit task' : 'Add new task'}</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={styles.label}>Task title</label>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={handleNameChange}
                  type="text"
                  placeholder={'> Add task title [ up to 100 characters ]'}
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>

        <div>
          <label className={styles.label}>Task description</label>
          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={handleInfoChange}
                  type="text"
                  placeholder={'> Add some more information [ up to 500 characters ]'}
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>

        <div className={styles.checkboxes}>
          <Controller
            control={control}
            name="isImportant"
            render={({ field, fieldState: { error } }) => (
              <div className="form-group form-check">
                <input
                  id={'isImportant'}
                  checked={field.value}
                  onChange={handleImportanceChange}
                  type="checkbox"
                  disabled={watch('isCompleted')}
                  className={`form-check-input ${error?.message ? 'is-invalid' : ''}`}
                />
                <label htmlFor="isImportant" className="form-check-label">
                  important
                </label>
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
          <Controller
            control={control}
            name="isCompleted"
            render={({ field, fieldState: { error } }) => (
              <div className="form-group form-check">
                <input
                  id={'isCompleted'}
                  checked={field.value}
                  onChange={handleStatusChange}
                  type="checkbox"
                  className={`form-check-input ${error?.message ? 'is-invalid' : ''}`}
                />
                <label htmlFor="isCompleted" className="form-check-label">
                  done
                </label>
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>
        <button className={styles.saveButton} type={'submit'}>
          Save
        </button>
      </form>
    </PageContainer>
  );
};
