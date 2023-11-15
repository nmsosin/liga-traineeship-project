import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledTitle = styled.h2`
  font-size: 50px;
  margin: 0;
  padding: 40px;
  color: #ad9898;
`;

export const StyledErrorDescription = styled.p`
  font-size: 18px;
  color: #3f3e45;
  margin: 0;
  padding-bottom: 80px;
`;

export const StyledBackButton = styled(NavLink)`
  text-decoration: none;
  padding: 10px 40px;
  background-color: transparent;
  border-radius: 15px;
  border: 2px solid #ad9898;
  color: #ad9898;
  &:hover {
    padding: 10px 50px;
    color: #ad9898;
  }
`;
