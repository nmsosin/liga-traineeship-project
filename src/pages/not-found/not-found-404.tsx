import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NotFound404: FC = () => {
  return (
    <>
      <h2>404 Page not found</h2>
      <p>Please, check the address</p>
      <NavLink to={'/'}>Back on track</NavLink>
    </>
  );
};
