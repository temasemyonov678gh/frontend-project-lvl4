import { Link, Outlet } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import React from 'react';
import useAuth from '../hooks/index.jsx';

const ExitButton = ({ children }) => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (auth.loggedIn || userId && userId.token) {
    return (
      <Button onClick={auth.logOut}>{children}</Button>
    );
  }

  return null;
};

export default () => (
  <div className="d-flex flex-column h-100">
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <ExitButton>Выйти</ExitButton>
      </Container>
    </Navbar>
    <Outlet />
  </div>
);