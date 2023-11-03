import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/PageContainer';

export const TaskForm: FC = () => {
  const { id } = useParams();

  return <PageContainer>{id ? <div>Редактирование</div> : <div>Добавление</div>}</PageContainer>;
};
