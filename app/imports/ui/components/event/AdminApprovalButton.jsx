import React, { useState } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Select from 'react-select';
import { eventUpdateMethod } from '../../../api/event/EventCollection.methods';

/** Renders an Edit and Delete Button */
const AdminApprovalButton = ({ event }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('');
    const typeDropdown = [
      { value: 'declined', label: 'declined' },
      { value: 'pending', label: 'pending' },
      { value: 'approved', label: 'approved' },
    ];
    const onSubmit = () => {
      const updateData = event;
      updateData.feedback = feedback;
      updateData.status = status.value;
      eventUpdateMethod.call(updateData, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Event review successfully', 'success').then(handleClose)));
    };

  return (
  <div>
    <Button variant="dark" onClick={handleShow}>
      Review
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Review Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
        <Col>
          <Form.Label htmlFor="basic-url">Feedback</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='feedback'
                         value={feedback} onChange={e => setFeedback(e.target.value)} as="textarea" rows={5}/>
          </InputGroup>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">Status Of Event</Form.Label>
          <Select
          options={typeDropdown}
          name='status'
          onChange={setStatus}
          defaultValue={status}
          />
        </Col>
        </Row>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};

/** Require a document to be passed to this component. */
AdminApprovalButton.propTypes = {
  event: PropTypes.object.isRequired,
};

/** export EventItem */
export default AdminApprovalButton;
