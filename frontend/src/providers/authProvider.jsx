/* eslint-disable react/jsx-no-constructed-context-values */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [authInfo, setAuthInfo] = useState(userId);
  const loggedIn = Boolean(userId);
  const navigate = useNavigate();

  const logIn = (data) => {
    const { token, username } = data;
    const storage = { token };
    const userName = { username };
    localStorage.setItem('userId', JSON.stringify(storage));
    localStorage.setItem('userName', JSON.stringify(userName));
    setAuthInfo(data);
    navigate('/');
    window.location.reload();
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setAuthInfo(null);
    navigate('/login');
  };

  return (
    <authContext.Provider
      value={{
        authInfo,
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
