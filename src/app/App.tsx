import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './app-header/app-header';
import styles from './styles.module.css';
import { TaskForm } from 'src/pages/task-form/task-form';
import { TaskList } from 'src/pages/task-list/task-list';
import { NotFound404 } from 'src/pages/not-found/not-found-404';
import { PageContainer } from 'src/components/PageContainer';
import { ADD_TASK_PAGE_ROUTE, EDIT_TASK_PAGE_ROUTE, MAIN_PAGE_ROUTE } from 'src/constants/routes';

export const App: FC = () => {
  return (
    <PageContainer className={styles.page}>
      <AppHeader />
      <main className={styles.app}>
        <Routes>
          <Route path={MAIN_PAGE_ROUTE} element={<TaskList />} />
          <Route path={ADD_TASK_PAGE_ROUTE} element={<TaskForm />} />
          <Route path={EDIT_TASK_PAGE_ROUTE} element={<TaskForm />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
    </PageContainer>
  );
};
