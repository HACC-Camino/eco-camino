import React, { useState } from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import { eventDefineMethod } from '../../../api/event/EventCollection.methods';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const AddEvent = () => {
  const [finalType, setFinalType] = useState(() => '');
  const [finalDate, setFinalDate] = useState(new Date());
  const [finalTitle, setFinalTitle] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalOwner, setFinalOwner] = useState(() => '');
  const [finalEmail, setFinalEmail] = useState(() => '');
  const [finalDescription, setFinalDescription] = useState(() => '');
  const typeDropdown = [
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Cleanup', label: 'Cleanup' },
  ];
  const onSubmit = () => {
    const type = finalType;
    const date = finalDate;
    const title = finalTitle;
    const location = finalLocation;
    const name = finalOwner;
    const email = finalEmail;
    const owner = Meteor.user().username;
    const description = finalDescription;
    eventDefineMethod.call({
      type, date, title, location, name,
      owner, email, description },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event Added Successfully', 'success');
        setFinalType('');
        setFinalDate(new Date());
        setFinalTitle('');
        setFinalLocation('');
        setFinalOwner('');
        setFinalEmail('');
        setFinalDescription('');
      }
    },
    );
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
          <Form.Label htmlFor="basic-url">Date of Event</Form.Label>
          <DatePicker
          name='Date of Event'
          selected={finalDate}
          onChange={(date) => setFinalDate(date)}
          />
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
            <FormControl placeholder='Name' value={finalOwner} onChange={e => setFinalOwner(e.target.value)} />
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
    </Container>
  );
};

export default (AddEvent);
