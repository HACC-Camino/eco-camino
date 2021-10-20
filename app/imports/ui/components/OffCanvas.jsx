import React, { useState } from 'react';
import { Offcanvas, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BsFillBellFill } from 'react-icons/bs';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notifications } from '../../api/notification/NotificationCollection';
import ToastNotificationOffcanvas from './ToastNotificationOffcanvas';
import { notificationUpdateMethod } from '../../api/notification/NotificationCollection.methods';

const OffCanvas = ({ notifications }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    notifications.map(notification => notificationUpdateMethod.call({ _id: notification._id, seen: true }));
  };

  const toggleShow = () => setShow((s) => !s);
  return (
      <>
        <a>
      <BsFillBellFill size="25px" color="white" style={{ cursor: 'pointer' }} onClick={toggleShow} />
        </a>
  <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Notifications</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <div className='overflow-auto' >
          {notifications.map(notification => <ToastNotificationOffcanvas
                  notifications={notification}
                  ready={!notification.seen}
                  key={notification._id}/>)}
      </div>
    </Offcanvas.Body>
  </Offcanvas>
  </>
  );
};

OffCanvas.propTypes = {
  notifications: PropTypes.array,
  ready: PropTypes.bool,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = Notifications.subscribeNotification().ready() && username !== undefined;
  const notifications = Notifications.getNotifications(username);
  // console.log(notifications);
  return {
    notifications,
    ready,
  };
})(OffCanvas);
