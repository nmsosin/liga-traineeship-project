import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #3f3e45;
  cursor: pointer;
`;

export const StyledHeaderTitle = styled.h1`
  font-size: 22px;
  color: #3f3e45;
  padding-left: 10px;
  text-transform: uppercase;
`;

export const StyledAddButton = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #ad9898;
  color: #f3f0ec;
  white-space: nowrap;
  padding: 7px 15px;
  &:hover {
    color: #3f3e45;
  }
`;
