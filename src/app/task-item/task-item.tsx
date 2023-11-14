import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteTask, updateTask } from 'src/services/actions/task/task-actions';
import styles from './styles.module.css';
import { TTaskItemProps } from './task-item.types';
import { useAppDispatch, useAppSelector } from 'src/services/hooks/hooks';
import { getSortedTasks, getTaskListData } from 'src/services/actions/task-list/task-list-actions';
import {
  getDeleteTaskRequestSelector,
  getTaskErrorSelector,
  getUpdateTaskRequestSelector,
} from 'src/constants/selector-creators';
import { Checkbox } from 'src/components/Checkbox';
import { booleanMap } from 'src/utils/mappers';

export const TaskItem: FC<TTaskItemProps> = ({ task, sort, filter }) => {
  const { id, name, info, isImportant, isCompleted } = task;
  const [importance, setImportance] = useState(booleanMap(isImportant));
  const [status, setStatus] = useState(booleanMap(isCompleted));
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const updateRequestStatus = useAppSelector(getUpdateTaskRequestSelector);
  const deleteRequestStatus = useAppSelector(getDeleteTaskRequestSelector);
  const error = useAppSelector(getTaskErrorSelector);
  useEffect(() => {
    setIsLoading(updateRequestStatus || deleteRequestStatus);
  }, [updateRequestStatus, deleteRequestStatus]);
  const getUpdateSortedTasks = (sort: string, filter?: string) => {
    switch (sort) {
      case 'filter':
        return getSortedTasks({ name_like: filter });
        break;
      case 'active':
        return getSortedTasks({ isCompleted: false || 'false' || undefined });
        break;
      case 'done':
        return getSortedTasks({ isCompleted: true || 'true' });
        break;
      case 'important':
        return getSortedTasks({ isImportant: true || 'true' });
        break;
      default:
        return getTaskListData();
    }
  };
  const handleDeleteTask = (taskId: number, sort: string, filter?: string) => {
    dispatch(deleteTask(taskId));
    setTimeout(() => {
      dispatch(getUpdateSortedTasks(sort, filter));
    }, 100);
  };
  const handleImportanceChange = (sort: string, filter?: string) => {
    setImportance(!importance);
    dispatch(updateTask(id, { isImportant: !importance }));
    setTimeout(() => {
      dispatch(getUpdateSortedTasks(sort, filter));
    }, 100);
  };
  const handleStatusChange = (sort: string, filter?: string) => {
    setStatus(!status);
    dispatch(updateTask(id, { isCompleted: !status }));
    setTimeout(() => {
      dispatch(getUpdateSortedTasks(sort, filter));
    }, 100);
  };
  return (
    <>
      {error && <p>{JSON.stringify(error)}</p>}
      <li
        key={id}
        className={`${styles.listItem} ${isCompleted ? styles.completed : ''} ${isImportant ? styles.important : ''}`}>
        <div className={styles.taskHeader}>
          <h2 className={styles.taskTitle}>
            {name} <span className={styles.taskId}>{`id #${id}`}</span>
          </h2>
          <div className={styles.taskActions}>
            <NavLink className={styles.editButton} to={`task-form/${id}`}>
              <svg width="40" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="45" height="45" rx="22.5" fill="#F3F0EC" />
                <rect x="22.1667" y="20.5" width="1.66667" height="12.5" rx="0.833333" fill="#F3F0EC" />
                <rect x="26.3333" y="20.5" width="1.66667" height="12.5" rx="0.833333" fill="#F3F0EC" />
                <rect x="18" y="20.5" width="1.66667" height="12.5" rx="0.833333" fill="#F3F0EC" />
                <rect
                  x="23.1618"
                  y="14.3702"
                  width="10"
                  height="14"
                  rx="1"
                  transform="rotate(39.8994 23.1618 14.3702)"
                  fill="#AD9898"
                />
                <path
                  d="M13.2296 35.3943C12.5067 35.6588 11.7685 35.0416 11.9008 34.2833L13.0919 27.4582C13.2242 26.6999 14.1279 26.3692 14.7184 26.863L20.0336 31.307C20.6241 31.8008 20.4587 32.7487 19.7358 33.0133L13.2296 35.3943Z"
                  fill="#AD9898"
                />
                <rect
                  x="31.4749"
                  y="20.0174"
                  width="10"
                  height="1"
                  transform="rotate(-140.101 31.4749 20.0174)"
                  fill="#AD9898"
                />
                <path
                  d="M33.3993 17.7159C33.045 18.1396 32.4143 18.1959 31.9906 17.8417L25.8533 12.7101C25.4296 12.3559 25.3733 11.7252 25.7275 11.3015V11.3015C26.7903 10.0304 28.6823 9.86155 29.9534 10.9243L33.0221 13.4901C34.2932 14.5529 34.462 16.4448 33.3993 17.7159V17.7159Z"
                  fill="#AD9898"
                />
              </svg>
            </NavLink>
            <button className={styles.deleteButton} type={'button'} onClick={() => handleDeleteTask(id, sort, filter)}>
              <svg width="40" height="40" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="45" height="45" rx="22.5" fill="#F3F0EC" />
                <path
                  d="M13.3061 20.6183C13.1407 18.3029 14.9745 16.3333 17.2959 16.3333H28.5485C30.9263 16.3333 32.7791 18.3952 32.5258 20.7595L31.2401 32.7595C31.0223 34.792 29.307 36.3333 27.2628 36.3333H18.1531C16.0545 36.3333 14.3127 34.7115 14.1632 32.6183L13.3061 20.6183Z"
                  fill="#AD9898"
                />
                <path
                  d="M13.7284 12.9506C13.3634 14.2282 14.3227 15.5 15.6515 15.5H29.9669C31.4028 15.5 32.3708 14.0319 31.8052 12.7122L31.3766 11.7122C31.0615 10.9768 30.3384 10.5 29.5384 10.5H15.9372C15.0442 10.5 14.2594 11.092 14.0141 11.9506L13.7284 12.9506Z"
                  fill="#AD9898"
                />
                <circle cx="23" cy="10.5" r="1.5" stroke="#AD9898" strokeWidth="2" />
                <rect x="22.1667" y="20.5" width="1.66667" height="12.5" rx="0.833333" fill="#F3F0EC" />
                <rect x="26.3333" y="20.5" width="1.66667" height="12.5" rx="0.833333" fill="#F3F0EC" />
                <rect x="18" y="20.5" width="1.66667" height="12.5" rx="0.833333" fill="#F3F0EC" />
              </svg>
            </button>
          </div>
        </div>
        <p className={styles.taskDescription}>{info}</p>
        <div className={styles.checkboxes}>
          <Checkbox
            id={id}
            label={'important'}
            checked={importance}
            onChange={isLoading ? undefined : () => handleImportanceChange(sort, filter)}
            disabled={isLoading || status}
          />
          <Checkbox
            id={id}
            label={'done'}
            checked={status}
            onChange={isLoading ? undefined : () => handleStatusChange(sort, filter)}
            disabled={isLoading}
          />
        </div>
      </li>
    </>
  );
};
