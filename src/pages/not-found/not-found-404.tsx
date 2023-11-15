import { FC } from 'react';
import { Box } from '@mui/material';
import styles from './styles.module.css';
import { StyledBackButton, StyledErrorDescription, StyledTitle } from 'src/pages/not-found/styled.not-found-404';

export const NotFound404: FC = () => {
  return (
    <Box display={'flex'} alignItems={'center'} flexDirection={'column'} padding={'80px 0'}>
      <StyledTitle>404 Page not found</StyledTitle>
      <StyledErrorDescription>Please, check the address</StyledErrorDescription>
      <StyledBackButton className={styles.backButton} to={'/'}>
        Back on track
      </StyledBackButton>
    </Box>
  );
};
