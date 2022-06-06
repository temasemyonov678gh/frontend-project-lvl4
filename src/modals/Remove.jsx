import React, { useRef } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { io } from 'socket.io-client';

import successCheck from '../utils/successCheck.js';

const generateOnSubmit = ({ modalInfo: { item }, onHide }, socket, buttonRef) => (e) => {
  buttonRef.current.setAttribute('disabled', '');
  e.preventDefault();
  socket.emit('removeChannel', { id: item }, successCheck(buttonRef));
  onHide();
};

const Remove = (props) => {
  const { onHide } = props;
  const socket = io();
  const buttonRef = useRef();
  const onSubmit = generateOnSubmit(props, socket, buttonRef);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <button className="me-2 btn btn-secondary" onClick={onHide} type="button">Отменить</button>
              <button type="submit" ref={buttonRef} className="btn btn-danger">Удалить</button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;