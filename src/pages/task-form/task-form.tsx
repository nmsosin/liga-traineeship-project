import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { PageContainer } from 'components/PageContainer';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { mockTasks } from 'mocks/mockTasks';

export const TaskForm: FC = () => {
  const { id } = useParams();
  const task = id ? mockTasks.filter((task) => Number(task._id) === Number(id))[0] : null;

  return (
    <PageContainer>
      <form className={styles.form} action="submit">
        <h2 className={styles.formTitle}>{id ? 'Edit task' : 'Add new task'}</h2>
        <TextField
          label={'Task title'}
          placeholder={'Go to the mall'}
          containerClassName={styles.label}
          inputType={'text'}
          value={task?.name}
          onChange={() => {
            console.log(task);
          }}
          errorText={''}
        />
        <TextField
          label={'Additional information'}
          placeholder={'Buy some new clothes'}
          containerClassName={styles.label}
          inputType={'text'}
          value={task?.info}
          onChange={() => {
            console.log('text field');
          }}
          errorText={''}
        />
        <Checkbox label={'important'} checked={task?.isImportant} onChange={() => console.log(true)} disabled={false} />
        <button className={styles.saveButton} type={'submit'}>
          Save
        </button>
      </form>
    </PageContainer>
  );
};
