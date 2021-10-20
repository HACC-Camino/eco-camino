import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';

const seconds = 7;
const secToMs = 1000;

const ToastNotification = ({ show, message }) => {
  const [showToast, setShowToast] = useState(show);

  const handleHide = () => setShowToast(false);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={showToast} onClose={handleHide} delay={seconds * secToMs} autohide>
        <Toast.Header>
          <img src={'images/camino_logo.png'}
               className="rounded me-2"
               alt=""
               width="30"
               height="30"/>
          <strong className="me-auto">EcoCamino</strong>
          <small className="text-muted">{new Date().toLocaleTimeString()}</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

ToastNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastNotification;
