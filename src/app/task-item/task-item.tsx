import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { TTask } from 'types/tasks';
import { Checkbox } from 'components/Checkbox';

type TTaskItemProps = {
  task: TTask;
};

export const TaskItem: FC<TTaskItemProps> = ({ task }) => {
  const { id, name, info, isImportant, isCompleted } = task;

  return (
    <li key={id} className={styles.listItem}>
      <NavLink to={`task-form/:${id}`}>
        <h2>{name}</h2>
      </NavLink>
      <p>{info}</p>
      <Checkbox label={'important'} checked={isImportant} onChange={() => console.log(isImportant)} disabled={false} />
      <Checkbox label={'done'} checked={isCompleted} onChange={() => console.log(isCompleted)} disabled={false} />
    </li>
  );
};
