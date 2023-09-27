import Header from '../components/Header';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes';
import { useAuth } from '../hooks';
import { useEffect, useRef } from 'react';

const Login = () => {
  let validationSchema = yup.object().shape({
    username: yup.string().required('Имя отсутствует'),
    password: yup.string().required('Пароль отсутствует'),
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
        console.log('error')
        actions.setErrors({ username: '', password: 'Неверные имя пользователя или пароль' });
        return;
      } else if (err.message === 'Network Error') {
        // toast.error(t('errors.network'));
        return;
      }
      throw err;
    }
  };

  return (
    <div className='login-section'>
      <Header />
      <div className="container">
        <img src={require('../assets/people-are-talking.png')} alt="image-boy" />
        <div className="card">
          <div className="card-body">
            <h4>Добро пожаловать !</h4>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleFormSubmit}
            >
              {({
                handleSubmit, handleChange, values, errors, isSubmitting, touched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>Войдите в аккаунт</h2>
                    <p>Чтобы пользоваться чатом</p>
                  </div>
                  <div className="form-body">
                    <Form.Group>
                      <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                      <Form.Control
                        id="username"
                        name="username"
                        type="name"
                        placeholder="Введите ваше имя"
                        ref={inputUsername}
                        onChange={handleChange}
                        value={values.username}
                      />
                      {errors.username && touched.username ? (
                        <div className='text-danger'>{errors.username}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите ваш пароль"
                        onChange={handleChange}
                        value={values.password}
                      />
                      {errors.password && touched.password ? (
                        <div className='text-danger'>{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    <Button variant="dark" type="submit">Войти</Button>
                  </div>
                  <div className="form-description">
                    <p>Нет аккаунта ? <Link className='link-signup' to="/signup">Зарегистрироваться</Link></p>
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

export default Login;