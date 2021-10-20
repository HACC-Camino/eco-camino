import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { eventDefineMethod } from '../../../api/event/EventCollection.methods';
import { reportRemoveItMethod } from '../../../api/report/ReportCollection.methods';

/** Renders an Edit and Delete Button */
const ConvertEvent = ({ report }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [finalDate, setFinalDate] = useState(new Date());
  const [finalStartTime, setFinalStartTime] = useState('');
  const [finalEndTime, setFinalEndTime] = useState('');
  const [finalTitle, setFinalTitle] = useState('');
  const [finalName, setFinalName] = useState('');
  const [finalEmail, setFinalEmail] = useState('');
  const [finalDescription, setFinalDescription] = useState('');

  const onSubmit = () => {
    const definitionData = {};
    definitionData.typeOfEvent = 'Cleanup';
    definitionData.date = finalDate;
    definitionData.startTime = moment(finalStartTime).format('hh:mm a');
    definitionData.endTime = moment(finalEndTime).format('hh:mm a');
    definitionData.participants = 1;
    definitionData.title = finalTitle;
    definitionData.location = report.location;
    definitionData.name = finalName;
    definitionData.email = finalEmail;
    definitionData.description = finalDescription;
    definitionData.lat = report.lat;
    definitionData.lng = report.lng;
    definitionData.owner = Meteor.user().username;
    definitionData.status = 'pending';
    definitionData.feedback = 'pending';
    const _id = report._id;
    eventDefineMethod.call(definitionData, (error) => (error ?
    swal('Error', error.message, 'error') :
    swal('Success', 'Added Event Successfully', 'success').then(handleClose)));
    reportRemoveItMethod.call({ _id });
  };

  return (
  <Container>
    <Button variant="primary" onClick={handleShow}>
      Adopt This Cleanup
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Adopt This Cleanup</Modal.Title>
      </Modal.Header>
      <Modal.Body><Row>
        <Col>
          <Form.Label htmlFor="basic-url">Title of Your Event</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='Title' value={finalTitle} onChange={e => setFinalTitle(e.target.value)} />
          </InputGroup>
        </Col>
      </Row>
        <Row>
          <Col>
            <Row>
              <Form.Label htmlFor="basic-url">Date of Event</Form.Label>
              <DatePicker
              id='datePicker'
              name='Date of Event'
              selected={finalDate}
              minDate={moment().toDate()}
              onChange={(date) => setFinalDate(date)}
              /></Row>
            <Row>
              <Col>
                <Form.Label htmlFor="basic-url">Start Time</Form.Label>
                <DatePicker
                id='datePicker'
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
                id='datePicker'
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
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </Container>
  );
};

/** Require a document to be passed to this component. */
ConvertEvent.propTypes = {
  report: PropTypes.object.isRequired,
};

/** export EventItem */
export default ConvertEvent;
