import { Button } from 'react-bootstrap';
import React from 'react';
import useAuth from '../hooks/index.jsx';

export default ({ children }) => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (auth.loggedIn || userId && userId.token) {
    return (
      <Button onClick={auth.logOut}>{children}</Button>
    );
  }

  return null;
};