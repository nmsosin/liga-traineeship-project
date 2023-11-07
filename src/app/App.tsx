import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './styles.module.css';
import { TaskForm } from 'pages/task-form/task-form';
import { TaskList } from 'pages/task-list/task-list';
import { NotFound404 } from 'pages/not-found/not-found-404';
import { PageContainer } from 'components/PageContainer';
import { AppHeader } from 'app/app-header/app-header';

export const App: FC = () => {
  return (
    <PageContainer className={styles.page}>
      <AppHeader />
      <main className={styles.app}>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/task-form/:id" element={<TaskForm />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
    </PageContainer>
  );
};
