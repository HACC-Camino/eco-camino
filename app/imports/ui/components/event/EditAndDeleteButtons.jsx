import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import EditHandle from './EditHandle';
import { eventRemoveItMethod } from '../../../api/event/EventCollection.methods';

/** Renders an Edit and Delete Button */
const EditandDeleteButtons = ({ event }) => {
  const deleteHandle = () => {
    const name = event.name;
    eventRemoveItMethod.call({ name },
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
      <Row>
        <Col><EditHandle event={event} /></Col>
        <Col><Button variant="danger" onClick={deleteHandle}>Delete</Button></Col>
      </Row>
    </Container>
  );
};

/** Require a document to be passed to this component. */
EditandDeleteButtons.propTypes = {
  event: PropTypes.object.isRequired,
};

/** export EventItem */
export default EditandDeleteButtons;
