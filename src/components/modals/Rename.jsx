import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';

import isUniqueChannelName from '../../utils/isUniqueChannelName.js';
import successCheck from '../../utils/successCheck.js';
import { useSocket } from '../../hooks/index.js';

const errors = {
  required: 'Обязательное поле',
  unique: 'Должно быть уникальным',
};

const generateOnSubmit = (onHide, id, socket, name, buttonRef) => {
  buttonRef.current.setAttribute('disabled', '');
  socket.emit('renameChannel', { id, name }, successCheck(buttonRef));
  onHide();
};

const Rename = (props) => {
  const socket = useSocket();
  const [error, setError] = useState(null);
  const { onHide, modalInfo: { item: { id, name: prevName } } } = props;
  const inputRef = useRef();
  const buttonRef = useRef();
  const f = useFormik({ onSubmit: ({ name }) => {
    if (name === '') {
      setError('required');
      return;
    }
    const isExist = isUniqueChannelName(name, props.channels);
    if (isExist) {
      setError('unique');
      return;
    }
    generateOnSubmit(onHide, id, socket, name, buttonRef);
  }, initialValues: { name: prevName } });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const feedbackStyle = {
    display: 'block',
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              aria-label="Имя канала"
              type="input"
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              data-testid="input-body"
              name="name"
              className="mb-2"
              isInvalid={error}
            />
          </FormGroup>
          <div className="invalid-feedback" style={feedbackStyle}>{error === 'required' || error === 'unique' ? errors[error] : null}</div>
          <div className="d-flex justify-content-end">
            <Button type="button" className="me-2" onClick={onHide} variant="secondary">Отменить</Button>
            <Button type="submit" ref={buttonRef} variant="primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;