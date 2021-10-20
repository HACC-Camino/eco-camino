import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Notifications } from '../../api/notification/NotificationCollection';

const seconds = 7;
const secToMs = 1000;

const ToastNotification = ({ page }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [forumId, setForumId] = useState('');
  // const [createdDate, setCreatedDate] = useState(new Date());

  const handleHide = () => setShowToast(false);

  Notifications.subscribeNotification();
  const current_date = new Date();
  const cursor = Notifications.find({});
  // console.log(cursor.fetch())
  cursor.observeChanges({
    added(id, doc) {
      setMessage(doc.message);
      setType(doc.type);
      setForumId(doc.forumID);
      // console.log(doc);
      if (doc.dateCreated > current_date) {
        setShowToast(true);
        console.log(doc);
      }
    },
  });

    // let count = 0;
    // Events.subscribe();
    // const cursor2 = Events.find({});
    // console.log(cursor2.fetch())
    // cursor2.observeChanges({
    //     added(id, event) {
    //         count += 1;
    //         console.log('this event was added');
    //         console.log(event);
    //         console.log(count);
    //     },
    // });

  const hrefForForum = `/forum/post/${forumId}`;

  if (page === 'app') {
    if (type === 'event') {
      // this will render if the type is equal to event and we are on the app page
      return (
          <Toast show={showToast} onClose={handleHide} delay={seconds * secToMs} autohide>
            <Toast.Header>
              <img src={'images/camino_logo.png'}
                   className="rounded me-2"
                   alt=""
                   width="30"
                   height="30"/>
              <strong className="me-auto">EcoCamino: Event</strong>
              <small className="text-muted">{new Date().toLocaleTimeString()}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
      );
    }
    if (type === 'forum') {
      // this will render if the type is equal to forum and we are on the app page
      return (
          <Toast show={showToast} onClose={handleHide} delay={seconds * secToMs} autohide>
            <Toast.Header>
              <img src={'images/camino_logo.png'}
                   className="rounded me-2"
                   alt=""
                   width="30"
                   height="30"/>
              <strong className="me-auto">EcoCamino: Forum</strong>
              <small className="text-muted">{new Date().toLocaleTimeString()}</small>
            </Toast.Header>
            <Toast.Body>
                <h6>{message}</h6>
                <a href={hrefForForum}>Link to Forum</a>
            </Toast.Body>
          </Toast>
      );
    }
  }

    // this will be returned if the page is not the app (this will be the offcanvas)
  if (page === 'offcanvas') {
    if (type === 'event') {
      // this will render if the type is equal to event and we are on the offcanvas
      return (
          <Toast show={showToast} onClose={handleHide} delay={seconds * secToMs} autohide>
            <Toast.Header>
              <strong className="me-auto">Event</strong>
              <small className="text-muted">{new Date().toLocaleTimeString()}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
      );
    }
    if (type === 'forum') {
      // this will render if the type is equal to forum and we are on the offcanvas
      return (
          <Toast show={showToast} onClose={handleHide} delay={seconds * secToMs} autohide>
            <Toast.Header>
              <strong className="me-auto">Forum</strong>
              <small className="text-muted">{new Date().toLocaleTimeString()}</small>
            </Toast.Header>
            <Toast.Body>
                <h6>{message}</h6>
                <a href={hrefForForum}>Link to Forum</a>
            </Toast.Body>
          </Toast>
      );
    }
  }

  // if its none of the cases above return null.
  return null;
};

ToastNotification.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ToastNotification;
