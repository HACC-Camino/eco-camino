import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ToastNotificationOffcanvas = ({ notifications, ready }) => {
    const [showToast, setShowToast] = useState(true);
    const handleHide = () => setShowToast(false);

    const hrefForForum = `/forum/post/${notifications.forumID}`;

    const renderNotification = () => {
        if (notifications.collectionType === 'event') {
            // this will render if the type is equal to event and we are on the offcanvas
            return (
                <Toast show={showToast} onClose={handleHide} >
                    <Toast.Header>
                        <strong className="me-auto">Event</strong>
                        <small className="text-muted">{new Date().toLocaleTimeString()}</small>
                    </Toast.Header>
                    <Toast.Body>{notifications.message}</Toast.Body>
                    <Link to={'/event'} replace style={{ padding: 10 }}>Click here to go to Events.</Link>
                </Toast>
            );
        }
        if (notifications.collectionType === 'forum') {
            // this will render if the type is equal to forum and we are on the offcanvas
            return (
                <Toast show={showToast} onClose={handleHide} >
                    <Toast.Header>
                        <strong className="me-auto">Forum</strong>
                        <small className="text-muted">{new Date().toLocaleTimeString()}</small>
                    </Toast.Header>
                    <Toast.Body>
                        <h6>{notifications.message}</h6>
                        <Link to={hrefForForum} style={{ padding: 10 }}>Link to Forum</Link>
                    </Toast.Body>
                </Toast>
            );
        }
        return null;
    };

    return (ready ? renderNotification() : null);

};

ToastNotificationOffcanvas.propTypes = {
    notifications: PropTypes.object,
    ready: PropTypes.bool,
};

export default ToastNotificationOffcanvas;
