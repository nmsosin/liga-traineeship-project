import { FC, useState } from 'react';
import styles from 'pages/task-list/styles.module.css';

export const SortBar: FC = () => {
  const [sort, setSort] = useState<'all' | 'active' | 'done' | 'important'>('all');
  return (
    <nav className={styles.sortBar}>
      <button
        onClick={() => setSort('all')}
        className={`${styles.sortButton} ${sort === 'all' ? styles.active : ''}`}
        type={'button'}>
        All
      </button>
      <button
        onClick={() => setSort('active')}
        className={`${styles.sortButton} ${sort === 'active' ? styles.active : ''}`}
        type={'button'}>
        Active
      </button>
      <button
        onClick={() => setSort('done')}
        className={`${styles.sortButton} ${sort === 'done' ? styles.active : ''}`}
        type={'button'}>
        Done
      </button>
      <button
        onClick={() => setSort('important')}
        className={`${styles.sortButton} ${sort === 'important' ? styles.active : ''}`}
        type={'button'}>
        Important
      </button>
    </nav>
  );
};
