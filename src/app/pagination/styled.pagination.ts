import styled from '@emotion/styled';
import { Pagination } from '@mui/material';

export const StyledPagination = styled(Pagination)`
  & button {
    width: 40px;
    height: 40px;
    background-color: #f3f0ec;
    border: none;
    border-radius: 50%;
    color: #ad9898;
    cursor: pointer;
    &:first-of-type {
      background-color: transparent;
    }
    &:last-of-type {
      background-color: transparent;
    }
    &.Mui-selected {
      color: #f3f0ec;
      background-color: #ad9898;
    }
  }
`;
