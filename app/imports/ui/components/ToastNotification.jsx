import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';

const seconds = 7;
const secToMs = 1000;

const ToastNotification = ({ page }) => {
  const [showToast, setShowToast] = useState(false);

  const handleHide = () => setShowToast(false);

  Notifications.subscribe();
  let message = '';
  let type = '';
  let seen = true;
  let forumId = '';
  const current_date = new Date.getTime();
  const cursor = Notifications.find({});
  cursor.observeChanges({
    added(id, doc) {
      message = doc.message;
      type = doc.type;
      seen = doc.seen;
      forumId = doc.forumID;
      if (doc.dateCreated.getTime() > current_date) {
        setShowToast(true);
      }
    },
  });

  if (page === 'app') {
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
  }
    // this will be returned if the page is not the app (this will be the offcanvas)
    return (
        <ToastContainer className="p-3">
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
  page: PropTypes.string.isRequired,
};

export default ToastNotification;
