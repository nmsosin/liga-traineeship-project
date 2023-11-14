import { Button, List, OutlinedInput, Tab, Tabs } from '@mui/material';
import styled from '@emotion/styled';

export const StyledSearchForm = styled.form`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  gap: 20px;
`;

export const StyledTextInput = styled(OutlinedInput)`
  border: 1px solid #ad9898;
  border-radius: 10px;
  & input {
    padding: 6px 20px;
  }
`;

export const StyledInvalidInputText = styled.div`
  width: 200px;
  text-wrap: normal;
  font-size: 14px;
  color: #d04a4a;
`;

export const StyledResetButton = styled(Button)`
  position: absolute;
  border: none;
  background-color: transparent;
  color: #ad9898;
  right: 0;
  top: 2px;
  &:hover {
    background-color: transparent;
    color: #3f3e45;
  }
`;

export const StyledButton = styled(Button)`
  text-transform: none;
  height: 35px;
  border: 1px solid #ad9898;
  border-radius: 5px;
  background-color: #f3f0ec;
  color: #ad9898;
  padding: 5px 20px;
  &:hover {
    border: 1px solid #3f3e45;
    background-color: #f3f0ec;
    color: #3f3e45;
  }
  &:disabled {
    background-color: transparent;
    cursor: auto;
    color: rgba(173, 152, 152, 0.33);
  }
  &:disabled:hover {
    border: 1px solid #ad9898;
    color: rgba(173, 152, 152, 0.33);
  }
`;

export const StyledSortBar = styled(Tabs)`
  overflow: visible;
  padding: 0 0 20px;
  & .MuiTabs-indicator {
    display: none;
  }
`;

export const StyledSortTab = styled(Tab)`
  text-transform: none;
  font-weight: normal;
  background-color: transparent;
  border: 2px solid #ad9898;
  color: #ad9898;
  box-sizing: border-box;
  padding: 5px 15px;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &:hover {
    font-weight: bold;
  }
  &.Mui-selected {
    background-color: #ad9898;
    color: #f3f0ec;
  }
`;

export const StyledTaskList = styled(List)`
  width: 100%;
  list-style-type: none;
  display: grid;
  gap: 20px;
  padding: 20px 0 40px;
`;

export const StyledErrorTitle = styled.h3`
  font-size: 40px;
  color: #d04a4a;
`;

export const StyledErrorDescription = styled.p`
  font-size: 16px;
  color: #3f3e45;
  padding: 20px 80px;
  border: 1px solid #d04a4a;
  border-radius: 20px;
`;
