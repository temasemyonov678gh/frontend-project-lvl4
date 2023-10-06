import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (
    <header>
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {t('header.brand')}
          </Navbar.Brand>
          {(auth.loggedIn || userId) && userId.token ? (
            <Button onClick={auth.logOut} variant="outline-dark">
              {t('header.button')}
            </Button>
          ) : null}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
