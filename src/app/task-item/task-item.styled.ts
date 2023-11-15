import styled from '@emotion/styled';
import { Button } from '@mui/material';

interface ListItemProps {
  isImportant: boolean;
  isCompleted?: boolean;
}
export const StyledListItem = styled.li<ListItemProps>`
  padding: 20px;
  border: ${(props) =>
    props.isCompleted ? '2px solid #ad9898' : props.isImportant ? '2px solid #d04a4a' : '2px solid #ad9898'};
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
  color: ${(props) => (props.isCompleted ? 'rgba(173, 152, 152, 0.5)' : 'inherit')};
  border-radius: 20px;
  & h2 {
    color: ${(props) => (props.isCompleted ? 'rgba(173, 152, 152, 0.5)' : props.isImportant ? '#d04a4a' : '#ad9898')};
  }
`;

export const StyledTaskId = styled.span`
  display: inline-block;
  width: 300px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  color: #dcd5cc;
`;
export const StyledTaskTitle = styled.h2`
  word-wrap: break-word;
  max-width: 400px;
  font-size: 28px;
  color: #ad9898;
  margin: 0;
  padding-top: 25px;
`;

export const StyledTaskDescription = styled.p`
  word-wrap: break-word;
  max-width: 500px;
  margin: 0;
  padding-bottom: 40px;
`;

export const StyledActionButton = styled(Button)`
  padding: 0;
  border: none;
  background-color: transparent;
  &:hover {
    transform: scale(1.1);
    background-color: transparent;
  }
`;
