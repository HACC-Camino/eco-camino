import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, useHistory } from 'react-router-dom';
import { Notifications } from '../../api/notification/NotificationCollection';

const seconds = 10;
const secToMs = 1000;

const ToastNotification = ({ page }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [forumId, setForumId] = useState('');

    const current_date = new Date();
    const ready = useTracker(() => {
        Notifications.subscribeNotification();
        const user = Meteor.user()?.username;
        Notifications.find({}).observeChanges({
            added: (id, item) => {
                setMessage(item.message);
                setType(item.collectionType);
                setForumId(item.forumID);
                // console.log(doc);
                if (item.dateCreated > current_date && item.owner === user) {
                    setShowToast(true);
                    return true;
                }
                return false;
            },
        });
        return true;
    }, []);
    const hrefForForum = `/forum/post/${forumId}`;
    const history = useHistory();
    const goToPage = () => {
        const pageLink = `#/forum/post/${forumId}`;
        history.push(pageLink);
    };
    const handleHide = () => {
        setShowToast(false);
    };
    const getContent = () => {
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
                        <Link to={'/events'} replace>Click here to go to Events.</Link>
                    </Toast>
                );
            }
            if (type === 'forum') {
                // this will render if the type is equal to forum and we are on the app page
                return (
                    <Toast show={showToast} onClose={handleHide} delay={seconds * secToMs} autohide onClick={goToPage}>
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
                            <Link to={hrefForForum} replace>Click here to go to post.</Link>
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
                            <Link to={hrefForForum}>Link to Forum</Link>
                        </Toast.Body>
                    </Toast>
                );
            }
        }
        return null;
    };

    return (ready ? getContent() : null);
};

ToastNotification.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ToastNotification;
