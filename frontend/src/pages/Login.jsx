import Header from '../components/Header';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const Login = () => {
  let validationSchema = yup.object().shape({
    name: yup.string().required('Имя отсутствует'),
    password: yup.string().required('Пароль отсутствует'),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    validationSchema
      .validate(values)
      .then((valid) => {
        console.log(valid);
        setSubmitting(false);
      });
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
              initialValues={{ name: '', password: '' }}
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
                      <Form.Label htmlFor="name">Имя пользователя</Form.Label>
                      <Form.Control
                        id="name"
                        name="name"
                        type="name"
                        placeholder="Введите ваше имя"
                        onChange={handleChange}
                        value={values.name}
                      />
                      {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
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