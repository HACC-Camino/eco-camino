import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { userEventRemoveItMethod } from '../../../api/user/UserEventCollection.methods';

/** Renders an Edit and Delete Button */
const LeaveButton = ({ ownerEvent, check }) => {
  const deleteHandle = () => {
    const eventIDT = ownerEvent;
    userEventRemoveItMethod.call({ eventIDT },
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
  ownerEvent: PropTypes.string.isRequired,
  check: PropTypes.bool.isRequired,
};

/** export EventItem */
export default LeaveButton;
