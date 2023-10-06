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

const SignUp = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('errors.username'))
      .max(20, t('errors.username'))
      .required(t('errors.required')),
    password: yup
      .string()
      .min(6, t('errors.password'))
      .required(t('errors.required')),
    confirmPassword: yup
      .string()
      .required(t('errors.required'))
      .oneOf([yup.ref('password'), null], t('errors.confirmPassword')),
  });

  const inputUsername = useRef();

  const { logIn } = useAuth();

  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await axios.post(routes.signupPath(), values);
      logIn(response.data);
    } catch (err) {
      if (err.response.status === 409) {
        actions.setErrors({
          username: t('errors.exist'),
          password: '',
          confirmPassword: '',
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
    <div className="signup-section">
      <Header />
      <div className="container">
        <img
          src={require('../assets/people-are-talking.png')}
          alt=''
        />
        <div className="card">
          <div className="card-body">
            <h4>{t('signUpPage.welcomeMessage')}</h4>
            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
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
                    <h2>{t('signUpPage.heading.signup')}</h2>
                    <p>{t('signUpPage.heading.useChat')}</p>
                  </div>
                  <div className="form-body">
                    <Form.Group>
                      <Form.Label htmlFor="username">
                        {t('formsElements.username.label')}
                      </Form.Label>
                      <Form.Control
                        id="username"
                        name="username"
                        type="name"
                        placeholder={t('formsElements.username.placeholder')}
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
                    <Form.Group>
                      <Form.Label htmlFor="confirmPassword">
                        {t('formsElements.confirmPassword.label')}
                      </Form.Label>
                      <Form.Control
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder={t(
                          'formsElements.confirmPassword.placeholder',
                        )}
                        onChange={handleChange}
                        value={values.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="text-danger">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Button variant="dark" type="submit">
                      {t('formsElements.buttons.signup')}
                    </Button>
                  </div>
                  <div className="form-description">
                    <p>
                      {t('signUpPage.haveAccount')}
                      {' '}
                      <Link className="link-login" to="/login">
                        {t('signUpPage.login')}
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
}

export default SignUp;
