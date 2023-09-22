import Header from '../components/Header';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
    return (
      <div className='login-section'>
        <Header />
        <div className="container">
          <img src={require('../assets/image-boy.png')} alt="image-boy"/>
          <div className="card">
            <div className="card-body">
              <h4>Добро пожаловать !</h4>
              <Form onSubmit={formik.handleSubmit}>
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
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Введите ваш пароль"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">Войти</Button>
                </div>
                <div className="form-description">
                  <p>Нет аккаунта ? <Link className='link-signup' to="/signup">Зарегистрироваться</Link></p>
                </div>
              </Form>
            </div>
          </div>
          <img src={require('../assets/image-girl.png')} />
        </div>
      </div>
    );
  }
  
  export default Login;