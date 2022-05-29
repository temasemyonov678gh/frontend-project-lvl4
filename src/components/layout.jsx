import { Link, Outlet } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import React from 'react';

export default () => (
  <div className="d-flex flex-column h-100">
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
    <Outlet />
  </div>
);