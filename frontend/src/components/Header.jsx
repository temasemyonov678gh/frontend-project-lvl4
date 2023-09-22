import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <header>
        <Navbar expand="lg" className="bg-white">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <Button variant="outline-dark">Войти</Button>
          </Container>
        </Navbar>
      </header>
    );
  }
  
  export default Header;
  