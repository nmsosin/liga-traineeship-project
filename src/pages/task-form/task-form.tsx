import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/PageContainer';
import { TextField } from 'components/TextField';

export const TaskForm: FC = () => {
  const { id } = useParams();

  return (
    <PageContainer>
      {id ? <div>Editing</div> : <div>Addition</div>}
      <TextField
        label={'label'}
        placeholder={'placeholder'}
        containerClassName=""
        inputType={'text'}
        value={'value'}
        onChange={() => {
          console.log('text field');
        }}
        errorText={''}
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
        errorText={''}
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
        errorText={''}
      />
    </PageContainer>
  );
};
