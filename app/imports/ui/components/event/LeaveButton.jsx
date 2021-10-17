import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { userEventRemoveItMethod } from '../../../api/user/UserEventCollection.methods';
import { eventUpdateMethod } from '../../../api/event/EventCollection.methods';

/** Renders an Edit and Delete Button */
const LeaveButton = ({ ownerID, event, check }) => {
  const deleteHandle = () => {
    const _id = ownerID;
    const updateData = event;
    updateData.participants = event.participants - 1;
    eventUpdateMethod.call(updateData, (error) => (error ?
    swal('Error', error.message, 'error') :
    swal('Success', 'Data edited successfully', 'success')));
    userEventRemoveItMethod.call({ _id },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event Deleted Successfully', 'success');
      }
    });
  };
  return (
  <Container style={{ paddingBottom: '10px' }}>
    {check ?
    <Row>
      <Col><Button variant="danger" onClick={deleteHandle}>Leave</Button></Col>
    </Row> :
    <Row>
      <Col><Button variant="danger" disabled>Leave</Button></Col>
    </Row>
    }
  </Container>
  );
};

/** Require a document to be passed to this component. */
LeaveButton.propTypes = {
  event: PropTypes.object.isRequired,
  ownerID: PropTypes.string.isRequired,
  check: PropTypes.bool.isRequired,
};

/** export EventItem */
export default LeaveButton;
