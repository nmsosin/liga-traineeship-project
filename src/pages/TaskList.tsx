import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/PageContainer';
import { SearchInput } from 'components/SearchInput';
import { TextField } from 'components/TextField';

export const TaskList: FC = () => {
  const { id } = useParams();

  return (
    <PageContainer>
      <div>Список задач</div>

      <SearchInput
        onChange={() => {
          console.log('1');
        }}
        value={'value'}
      />

      <TextField
        label={'label'}
        placeholder={'placeholder'}
        containerClassName=""
        inputType={'text'}
        value={'value'}
        onChange={() => {
          console.log('text field');
        }}
        errorText={'error text'}
      />
    </PageContainer>
  );
};
