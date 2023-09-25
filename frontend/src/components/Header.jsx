import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Header = () => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (
    <header>
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          {(auth.loggedIn || userId) && userId.token ? <Button onClick={auth.logOut} variant="outline-dark">Выйти</Button> : null}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
