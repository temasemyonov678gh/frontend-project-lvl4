import { useRef, useEffect } from "react";
import * as yup from "yup";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useSocket } from "../../hooks/index.js";
import { useTranslation } from "react-i18next";

const Add = (props) => {
  const { t } = useTranslation();

  const { onHide, channels } = props;
  const socket = useSocket();

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, t("errors.name"))
      .max(20, t("errors.name"))
      .required(t("errors.required")),
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
      actions.setErrors({ name: t("errors.unique") });
    } else {
      socket.emit("newChannel", { name });
      onHide();
    }
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t("modals.add.title")}</Modal.Title>
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
                  {t("formsElements.name.label")}
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
                {t("formsElements.buttons.add")}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
