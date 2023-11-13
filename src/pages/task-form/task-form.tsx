import { FC, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v1 } from 'uuid';
import { useForm } from '../../services/hooks/use-form';
import { updateTask } from '../../services/actions/taskActions';
import { TStore } from '../../services/reducers';
import { addNewTask, getTaskListData } from '../../services/actions/taskListActions';
import { useAppDispatch } from '../../services/hooks/hooks';
import styles from './styles.module.css';
import { PageContainer } from 'components/PageContainer';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';

import { TTask } from 'types/tasks';

export const TaskForm: FC = () => {
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tasks = useSelector((store: TStore) => store.taskList.tasks);
  const task = taskId
    ? tasks.filter((task) => Number(task.id) === Number(taskId))[0]
    : { name: '', info: '', isImportant: false, isCompleted: false, _id: v1() };
  const { id, name, info, isImportant, isCompleted } = task as TTask;
  const { values, handleChange } = task
    ? useForm({
        name: name,
        info: info,
      })
    : useForm({
        name: '',
        info: '',
      });
  const [importance, setImportance] = useState(isImportant);
  const [status, setStatus] = useState(isCompleted);
  const handleImportanceChange = () => {
    setImportance(!importance);
  };
  const handleStatusChange = () => {
    setStatus(!status);
  };
  const handleSubmitChanges = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(evt);
    if (id) {
      dispatch(
        updateTask(id, {
          _id: id,
          name: values.name,
          info: values.info,
          isImportant: importance,
          isCompleted: status,
        })
      );
    } else {
      dispatch(
        addNewTask({
          _id: id,
          name: values.name,
          info: values.info,
          isImportant: importance,
          isCompleted: status,
        })
      );
    }
    dispatch(getTaskListData());
    navigate(-1);
  };
  return (
    <PageContainer>
      <form className={styles.form} onSubmit={handleSubmitChanges}>
        <h2 className={styles.formTitle}>{id ? 'Edit task' : 'Add new task'}</h2>
        <TextField
          label={'Task title'}
          name={'name'}
          placeholder={'Go to the mall'}
          containerClassName={styles.label}
          inputType={'text'}
          value={values.name}
          onChange={handleChange}
          errorText={''}
        />
        <TextField
          label={'Additional information'}
          name={'info'}
          placeholder={'Buy some new clothes'}
          containerClassName={styles.label}
          inputType={'text'}
          value={values.info}
          onChange={handleChange}
          errorText={''}
        />
        <Checkbox id={id} label={'important'} checked={importance} onChange={handleImportanceChange} disabled={false} />
        <Checkbox id={id} label={'done'} checked={status} onChange={handleStatusChange} disabled={false} />
        <button className={styles.saveButton} type={'submit'}>
          Save
        </button>
      </form>
    </PageContainer>
  );
};
