/* eslint-disable global-require */

import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import routes from '../routes';
import Header from '../components/Header';

const Login = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    username: yup.string().required(t('errors.required')),
    password: yup.string().required(t('errors.required')),
  });

  const inputUsername = useRef();

  const { logIn } = useAuth();

  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await axios.post(routes.loginPath, values);
      logIn(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        console.log('error');
        actions.setErrors({
          username: '',
          password: t('errors.auth'),
        });
        return;
      } if (err.message === 'Network Error') {
        toast.error(t('errors.network'));
        return;
      }
      throw err;
    }
  };

  return (
    <div className="login-section">
      <Header />
      <div className="container">
        <img
          src={require('../assets/people-are-talking.png')}
          alt=""
        />
        <div className="card">
          <div className="card-body">
            <h4>{t('loginPage.welcomeMessage')}</h4>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleFormSubmit}
            >
              {({
                handleSubmit, handleChange, values, errors, touched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>{t('loginPage.heading.loginToAccount')}</h2>
                    <p>{t('loginPage.heading.useChat')}</p>
                  </div>
                  <div className="form-body">
                    <Form.Group>
                      <Form.Label htmlFor="username">
                        {t('formsElements.nickname.label')}
                      </Form.Label>
                      <Form.Control
                        id="username"
                        name="username"
                        type="name"
                        placeholder={t('formsElements.nickname.placeholder')}
                        ref={inputUsername}
                        onChange={handleChange}
                        value={values.username}
                      />
                      {errors.username && touched.username ? (
                        <div className="text-danger">{errors.username}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="password">
                        {t('formsElements.password.label')}
                      </Form.Label>
                      <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        placeholder={t('formsElements.password.placeholder')}
                        onChange={handleChange}
                        value={values.password}
                      />
                      {errors.password && touched.password ? (
                        <div className="text-danger">{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    <Button variant="dark" type="submit">
                      {t('formsElements.buttons.login')}
                    </Button>
                  </div>
                  <div className="form-description">
                    <p>
                      {t('loginPage.noAccount')}
                      {' '}
                      <Link className="link-signup" to="/signup">
                        {t('loginPage.signup')}
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
