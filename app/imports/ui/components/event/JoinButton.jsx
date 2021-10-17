import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { userEventDefineMethod } from '../../../api/user/UserEventCollection.methods';
import { eventUpdateMethod } from '../../../api/event/EventCollection.methods';

/** Renders an Edit and Delete Button */
const JoinButton = ({ event, username, check }) => {
  const joinHandle = () => {
    const dateJoined = new Date();
    const owner = username;
    const eventID = event._id;
    const updateData = event;
    updateData.participants = event.participants + 1;
    eventUpdateMethod.call(updateData, (error) => (error ?
    swal('Error', error.message, 'error') :
    swal('Success', 'Data edited successfully', 'success')));
    userEventDefineMethod.call({
      dateJoined, owner, eventID },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event Added Successfully', 'success');
      }
    });
  };
  return (
  <Container style={{ paddingBottom: '10px' }}>
    {check ?
    <Row>
      <Col><Button variant="success" onClick={joinHandle} disabled>Join</Button></Col>
    </Row> :
    <Row>
      <Col><Button variant="success" onClick={joinHandle}>Join</Button></Col>
    </Row>
    }
  </Container>
  );
};

/** Require a document to be passed to this component. */
JoinButton.propTypes = {
  event: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  check: PropTypes.bool.isRequired,
};

/** export EventItem */
export default JoinButton;
