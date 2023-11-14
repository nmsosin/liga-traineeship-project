import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

export const NotFound404: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>404 Page not found</h2>
      <p className={styles.text}>Please, check the address</p>
      <NavLink className={styles.backButton} to={'/'}>
        Back on track
      </NavLink>
    </div>
  );
};
