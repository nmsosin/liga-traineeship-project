import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { updateTask } from '../../services/actions/task/task-actions';
import { addNewTask, getTaskListData } from '../../services/actions/task-list/task-list-actions';
import { TStore } from '../../services/reducers/store/store.types';
import styles from './styles.module.css';
import { TTask } from 'types/tasks';
import { TaskSubmitForm } from 'app/form/form-validation.types';
import { validationSchema } from 'app/form/form-validation';
import { Loader } from 'components/Loader';
import { getTaskRequestSelector } from 'constants/selector-creators';

export type TFormProps = {
  task: TTask | null;
  taskId: number | null;
};
export const Form: FC<TFormProps> = ({ task, taskId }) => {
  const status = useAppSelector(getTaskRequestSelector);
  const [isLoading, setIsLoading] = useState(status);
  useEffect(() => {
    setIsLoading(status);
  }, [status]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultValues: TaskSubmitForm =
    taskId && task !== null
      ? task
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={isLoading ? styles.wrapper : ''}>
        <Loader isLoading={isLoading} variant={'circle'}>
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
        </Loader>
      </div>
    </form>
  );
};
