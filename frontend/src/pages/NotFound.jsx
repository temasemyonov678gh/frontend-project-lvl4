/* eslint-disable global-require */

import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFound = () => (
  <div className="not-found-section">
    <Header />
    <div className="container">
      <div className="error-container">
        <h1>404</h1>
        <div className="error-container-desctiption">
          Упс!.. Страница не найдена.
        </div>
      </div>
      <div className="link-container">
        <Link to="/" className="link-home">
          <img
            src={require('../assets/arrow.png')}
            alt=""
          />
          На главную
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
