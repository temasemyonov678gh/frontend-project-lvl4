import { useRef, useEffect } from "react";
import * as yup from "yup";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import { useSocket } from "../../hooks/index.js";

const Add = (props) => {
  const {
    onHide,
    modalInfo: { item },
    channels,
  } = props;
  const socket = useSocket();

  const handleFormSubmit = () => {
    socket.emit("removeChannel", { id: item });
    onHide();
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ channelId: item.id }}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <p className="text-confirm">Уверены?</p>
              <Button
                className="btn-remove-channel"
                variant="danger"
                type="submit"
              >
                Удалить
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
