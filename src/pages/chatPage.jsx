import React from "react";
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

export default () => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (auth.loggedIn || userId && userId.token) {
    return (
      <h1>CHATTTT!</h1>
    );
  }

  return (
    <Navigate to="/login" replace />
  );
};