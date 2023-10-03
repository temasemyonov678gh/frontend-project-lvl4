import Header from "../components/Header";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import routes from "../routes";
import { useAuth } from "../hooks";
import { useEffect, useRef } from "react";

const SignUp = () => {
  let validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Имя отсутствует"),
    password: yup
      .string()
      .min(6, "Не менее 6 символов")
      .required("Пароль отсутствует"),
    confirmPassword: yup
      .string()
      .required("Подтвердите пароль")
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
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
      console.log(err);
      if (err.response.status === 409) {
        console.log('error')
        actions.setErrors({ username: 'Такой пользователь уже существует', password: '', confirmPassword: '' });
        return;
      } else if (err.message === 'Network Error') {
        // toast.error(t('errors.network'));
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
          src={require("../assets/people-are-talking.png")}
          alt="image-boy"
        />
        <div className="card">
          <div className="card-body">
            <h4>Добро пожаловать !</h4>
            <Formik
              initialValues={{
                username: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleFormSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                isSubmitting,
                touched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>Зарегистрируйтесь</h2>
                    <p>Чтобы пользоваться чатом</p>
                  </div>
                  <div className="form-body">
                    <Form.Group>
                      <Form.Label htmlFor="username">
                        Имя пользователя
                      </Form.Label>
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
                        <div className="text-danger">{errors.username}</div>
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
                        <div className="text-danger">{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="confirmPassword">
                        Подтвердите пароль
                      </Form.Label>
                      <Form.Control
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Введите ваш пароль"
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
                      Зарегистрироваться
                    </Button>
                  </div>
                  <div className="form-description">
                    <p>
                      Уже есть аккаунт ?{" "}
                      <Link className="link-login" to="/login">
                        Войти
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

export default SignUp;
