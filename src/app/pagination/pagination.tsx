import React, { FC } from 'react';
import { Box } from '@mui/material';
import { TPaginationProps } from 'src/app/pagination/pagination.types';
import { StyledPagination } from 'src/app/pagination/styled.pagination';

export const AppPagination: FC<TPaginationProps> = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <StyledPagination
        count={Math.ceil(totalTasks / tasksPerPage)}
        page={currentPage}
        onChange={(e, value) => paginate(value)}
      />
    </Box>
  );
};
