import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { TaskSubmitForm } from 'src/app/form/form-validation.types';
import { validationSchema } from 'src/app/form/form-validation';
import { updateTask } from 'src/services/actions/task/task-actions';
import { addNewTask, getTaskListData } from 'src/services/actions/task-list/task-list-actions';
import { useAppDispatch, useAppSelector } from 'src/services/hooks/hooks';
import { getTaskRequestSelector } from 'constants/selector-creators';
import { Loader } from 'components/Loader';
import { TTask } from 'types/tasks';
import { StyledForm, StyledLabel, StyledSaveButton, StyledTextInput } from 'src/app/form/styled.form';

export type TFormProps = {
  task: TTask | null;
  taskId: number | null;
};
export const Form: FC<TFormProps> = ({ task, taskId }) => {
  const status = useAppSelector(getTaskRequestSelector);
  const [isLoading, setIsLoading] = useState(status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsLoading(status);
  }, [status]);
  const navigate = useNavigate();
  const defaultValues: TaskSubmitForm =
    taskId && task !== null
      ? task
      : {
          name: '',
          info: '',
          isImportant: false,
          isCompleted: false,
        };
  const { watch, handleSubmit, control, setValue } = useForm<TaskSubmitForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('name', evt.target.value);
  };
  const handleInfoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('info', evt.target.value);
  };

  const handleImportanceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', evt.target.checked);
  };
  const handleStatusChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isCompleted', evt.target.checked);
  };
  const onSubmit = (data: TaskSubmitForm) => {
    if (taskId) {
      dispatch(updateTask(taskId, data));
    } else {
      dispatch(addNewTask(data));
    }
    setTimeout(() => {
      dispatch(getTaskListData());
      navigate(-1);
    }, 100);
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={isLoading ? 'center' : 'stretch'}
        margin={isLoading ? '100px 0 60px' : '0'}>
        <Loader isLoading={isLoading} variant={'circle'}>
          <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
            <div>
              <StyledLabel>Task title</StyledLabel>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <StyledTextInput
                      error={error?.message ? true : false}
                      helperText={error?.message ? `${error?.message}` : ''}
                      value={field.value}
                      onChange={handleNameChange}
                      type="text"
                      placeholder={'> Add task title [ up to 100 characters ]'}
                    />
                  </div>
                )}
              />
            </div>
            <div>
              <StyledLabel>Task description</StyledLabel>
              <Controller
                control={control}
                name="info"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <StyledTextInput
                      error={error?.message ? true : false}
                      helperText={error?.message ? `${error?.message}` : ''}
                      value={field.value}
                      onChange={handleInfoChange}
                      type="text"
                      placeholder={'> Add some more information [ up to 500 characters ]'}
                    />
                  </div>
                )}
              />
            </div>
          </Box>
          <Box display={'flex'} gap={'40px'} paddingTop={'20px'}>
            <Controller
              control={control}
              name="isImportant"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControlLabel
                    disabled={watch('isCompleted')}
                    label={'important'}
                    control={<Checkbox checked={field.value} onChange={handleImportanceChange} />}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="isCompleted"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControlLabel
                    label={'done'}
                    control={<Checkbox id={'isCompleted'} checked={field.value} onChange={handleStatusChange} />}
                  />
                </div>
              )}
            />
          </Box>
          <StyledSaveButton type={'submit'}>Save</StyledSaveButton>
        </Loader>
      </Box>
    </StyledForm>
  );
};
