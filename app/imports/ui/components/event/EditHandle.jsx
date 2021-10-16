import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { eventUpdateMethod } from '../../../api/event/EventCollection.methods';

/** Renders an Edit and Delete Button */
const EditHandle = ({ event }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [finalType, setFinalType] = useState({ value: event.typeOfEvent, label: event.typeOfEvent });
    const [finalDate, setFinalDate] = useState(event.date);
    const convertStartTime = moment(event.startTime, 'HH:mm a').toDate();
    const convertEndTime = moment(event.endTime, 'HH:mm a').toDate();
    const [finalStartTime, setFinalStartTime] = useState(convertStartTime);
    const [finalEndTime, setFinalEndTime] = useState(convertEndTime);
    const [finalTitle, setFinalTitle] = useState(event.title);
    const [finalLocation, setFinalLocation] = useState(event.location);
    const [finalName, setFinalName] = useState(event.name);
    const [finalEmail, setFinalEmail] = useState(event.email);
    const [finalDescription, setFinalDescription] = useState(event.description);
    const typeDropdown = [
      { value: 'Workshop', label: 'Workshop' },
      { value: 'Cleanup', label: 'Cleanup' },
    ];
    const onSubmit = () => {
      const updateData = {};
      updateData._id = event._id;
      const type = (finalType === event.typeOfEvent ? finalType : finalType.value);
      updateData.typeOfEvent = type;
      updateData.date = finalDate;
      const startTime = moment(finalStartTime).format('hh:mm a');
      const endTime = moment(finalEndTime).format('hh:mm a');
      updateData.startTime = startTime;
      updateData.endTime = endTime;
      updateData.title = finalTitle;
      updateData.location = finalLocation;
      updateData.name = finalName;
      updateData.email = finalEmail;
      updateData.description = finalDescription;
      eventUpdateMethod.call(updateData, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Data edited successfully', 'success').then(handleClose)));

    };

  return (
  <Container>
    <Button variant="primary" onClick={handleShow}>
      Edit
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body><Row>
        <Col>
          <Form.Label htmlFor="basic-url">Title of Your Event</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='Title' value={finalTitle} onChange={e => setFinalTitle(e.target.value)} />
          </InputGroup>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">Type of Event</Form.Label>
          <Select
          options={typeDropdown}
          name='type'
          onChange={setFinalType}
          defaultValue={finalType}
          />
        </Col>
      </Row>
        <Row>
          <Col>
            <Row>
              <Form.Label htmlFor="basic-url">Date of Event</Form.Label>
              <DatePicker
              name='Date of Event'
              selected={finalDate}
              onChange={(date) => setFinalDate(date)}
              /></Row>
            <Row>
              <Col>
                <Form.Label htmlFor="basic-url">Start Time</Form.Label>
                <DatePicker
                selected={finalStartTime}
                onChange={(date) => setFinalStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="h:mm aa"
                defaultDate={finalStartTime}
                /></Col>
              <Col>
                <Form.Label htmlFor="basic-url">End Time</Form.Label>
                <DatePicker
                selected={finalEndTime}
                onChange={(date) => setFinalEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="h:mm aa"
                defaultDate={finalEndTime}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">Location</Form.Label>
            <InputGroup className="mb-3">
              <FormControl placeholder='Title' value={finalLocation} onChange={e => setFinalLocation(e.target.value)} />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Name</Form.Label>
            <InputGroup className="mb-3">
              <FormControl placeholder='Name' value={finalName} onChange={e => setFinalName(e.target.value)} />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">Contact Email</Form.Label>
            <InputGroup className="mb-3">
              <FormControl placeholder='Email' value={finalEmail} onChange={e => setFinalEmail(e.target.value)} />
            </InputGroup>
          </Col>
        </Row>
        <Form.Label htmlFor="basic-url">Description of Event</Form.Label>
        <InputGroup className="mb-3">
          <FormControl placeholder='Description'
                       value={finalDescription} onChange={e => setFinalDescription(e.target.value)} />
        </InputGroup></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </Container>
  );
};

/** Require a document to be passed to this component. */
EditHandle.propTypes = {
  event: PropTypes.object.isRequired,
};

/** export EventItem */
export default EditHandle;
