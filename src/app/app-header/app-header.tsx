import { FC } from 'react';
import { Box } from '@mui/material';
import { StyledAddButton, StyledHeaderTitle, StyledNavLink } from 'src/app/app-header/styled.app-header';
import { useAppDispatch } from 'src/services/hooks/hooks';
import { resetTask } from 'src/services/actions/task/task-actions';
export const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const onAddTaskClick = () => {
    dispatch(resetTask());
  };
  return (
    <header>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding={'10px 0 30px'}>
        <StyledNavLink to={'/'}>
          <svg width="50" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="72" height="72" rx="36" fill="#F3F0EC" />
            <path
              d="M20.2776 52.2297L42.0675 58.0404C46.8289 59.3101 51.5 55.7213 51.5 50.7936L51.5 24.015C51.5 19.1998 47.027 15.6321 42.3323 16.7028L32.9717 18.8377L21.6253 21.4254C18.3944 22.1623 16.0301 24.9323 15.8096 28.2388L14.7266 44.484C14.4882 48.0607 16.814 51.3061 20.2776 52.2297Z"
              fill="#F3F0EC"
              stroke="#3F3E45"
              strokeWidth="7"
            />
            <path
              d="M25.0098 33.068C29.7249 40.0831 24.5005 51.6109 37.8772 38.5768C51.2539 25.5427 49.5 21 64 18.5"
              stroke="#4ABB77"
              strokeWidth="7"
            />
          </svg>
          <StyledHeaderTitle>Todo list</StyledHeaderTitle>
        </StyledNavLink>
        <StyledAddButton to={'/task-form'} onClick={() => onAddTaskClick()}>
          Add new task
        </StyledAddButton>
      </Box>
    </header>
  );
};
