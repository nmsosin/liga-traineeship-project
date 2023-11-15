import styled from '@emotion/styled';
import { Button, OutlinedInput, TextField } from '@mui/material';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: 2px solid #ad9898;
  border-radius: 20px;
  gap: 20px;
`;

export const StyledLabel = styled.label`
  color: #ad9898;
  font-size: 18px;
  padding-bottom: 10px;
`;

export const StyledSaveButton = styled(Button)`
  text-transform: none;
  border: none;
  border-radius: 5px;
  background-color: #ad9898;
  color: #f3f0ec;
  white-space: nowrap;
  padding: 7px 45px;
  margin-top: 40px;
  align-self: center;
  &:hover {
    color: #3f3e45;
    background-color: #ad9898;
  }
`;

export const StyledTextInput = styled(TextField)`
  width: 100%;
  & input {
    padding: 6px 20px;
  }
  & p {
    color: #d04a4a;
    font-size: 14px;
  }
`;
