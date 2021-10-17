import React, { useState } from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import moment from 'moment';
import { eventDefineMethod } from '../../../api/event/EventCollection.methods';
import UploadPhotoModal from '../../components/aws/UploadPhotoModal';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const AddEvent = () => {
  const [data, setData] = useState(null);
  const handleCallback = (childData) => {
    setData(childData);
  };
  const [finalType, setFinalType] = useState(() => '');
  const [finalDate, setFinalDate] = useState(new Date());
  const [finalStartTime, setFinalStartTime] = useState('');
  const [finalEndTime, setFinalEndTime] = useState('');
  const [finalTitle, setFinalTitle] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalName, setFinalName] = useState(() => '');
  const [finalEmail, setFinalEmail] = useState(() => '');
  const [finalDescription, setFinalDescription] = useState(() => '');
  const typeDropdown = [
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Cleanup', label: 'Cleanup' },
  ];
  const onSubmit = () => {
    const typeOfEvent = finalType.value;
    const date = finalDate;
    const startTime = moment(finalStartTime).format('hh:mm a');
    const endTime = moment(finalEndTime).format('hh:mm a');
    const title = finalTitle;
    const location = finalLocation;
    const name = finalName;
    const email = finalEmail;
    const participants = 1;
    const owner = Meteor.user().username;
    const description = finalDescription;
    eventDefineMethod.call({
      typeOfEvent, date, startTime, endTime, participants, title, location, name,
      owner, email, description },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event Added Successfully', 'success');
        setFinalType('');
        setFinalDate(new Date());
        setFinalStartTime('');
        setFinalEndTime('');
        setFinalTitle('');
        setFinalLocation('');
        setFinalName('');
        setFinalEmail('');
        setFinalDescription('');
      }
    });
  };
  return (
    <Container>
      <Row>
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
            isSearchable={true}
            onChange={setFinalType}
            defaultValue={finalType}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
            <Form.Label htmlFor="basic-url">Date of Event</Form.Label>
            <DatePicker
          name='Date of Event'
          minDate={moment().toDate()}
          selected={finalDate}
          onChange={(date) => setFinalDate(date)}
          />
            </Col>
            <Col>
              <UploadPhotoModal parentCallback={handleCallback}/>
            </Col>
          </Row>
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
      </InputGroup>
      <Button variant="primary" size="sm" onClick={onSubmit}>
        Submit
      </Button>
      <Row>{data}</Row>
    </Container>
  );
};

export default (AddEvent);
