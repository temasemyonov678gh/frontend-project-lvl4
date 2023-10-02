import { useRef, useEffect } from "react";
import * as yup from "yup";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import { useSocket } from "../../hooks/index.js";

const Add = (props) => {
  const { onHide, channels } = props;
  const socket = useSocket();

  let validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Название отсутствует"),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFormSubmit = (values, actions) => {
    const { name } = values;
    const findSameChannel = channels.find((channel) => channel.name === name);
    const isExist = Boolean(findSameChannel);
    if (isExist) {
      actions.setErrors({ name: "Такой канал уже существует" });
    } else {
      socket.emit("newChannel", { name });
      onHide();
    }
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name" className="visually-hidden">
                  Название канала
                </Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="name"
                  placeholder=""
                  ref={inputRef}
                  onChange={handleChange}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}
              </Form.Group>
              <Button className="btn-add-channel" variant="dark" type="submit">
                Добавить
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
