import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './style.css';
import { TaskForm } from '../pages/TaskForm';
import { TaskList } from '../pages/TaskList';

export const App: FC = () => {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/task-form/:id" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
