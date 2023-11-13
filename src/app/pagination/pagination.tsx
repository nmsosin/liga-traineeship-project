import { FC, MouseEventHandler } from 'react';
import styles from './styles.module.css';

type TPaginationProps = {
  tasksPerPage: number;
  totalTasks: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

export const Pagination: FC<TPaginationProps> = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.paginationBar}>
      <ul className={styles.pages}>
        {pageNumbers.map((pageNumber) => (
          <li className={styles.pageItem} key={pageNumber}>
            <button
              className={`${styles.pageButton} ${pageNumber === currentPage ? styles.active : ''}`}
              type={'button'}
              onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
