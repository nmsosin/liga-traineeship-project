import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import { useForm } from '../../services/hooks/use-form';
import { ADD_TASK, UPDATE_TASK } from '../../services/actions/taskActions';
import styles from './styles.module.css';
import { PageContainer } from 'components/PageContainer';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { mockTasks } from 'mocks/mockTasks';
import { TTask } from 'types/tasks';

export const TaskForm: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = id
    ? mockTasks.filter((task) => task._id === id)[0]
    : { name: '', info: '', isImportant: false, isCompleted: false, _id: v1() };
  const { _id, name, info, isImportant, isCompleted } = task as TTask;
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
  const handleImportanceChange = () => {
    setImportance(!importance);
    console.log(importance);
  };
  const handleSubmitChanges = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(evt);
    if (id) {
      dispatch({
        type: UPDATE_TASK,
        id: _id,
        payload: { name: values.name, info: values.info, isImportant: importance },
      });
    } else {
      dispatch({
        type: ADD_TASK,
        payload: { _id: _id, name: values.name, info: values.info, isImportant: importance, isCompleted: isCompleted },
      });
    }
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
        <Checkbox
          id={_id}
          label={'important'}
          checked={importance}
          onChange={handleImportanceChange}
          disabled={false}
        />
        <button className={styles.saveButton} type={'submit'}>
          Save
        </button>
      </form>
    </PageContainer>
  );
};
