import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EditandDeleteButtons from './EditAndDeleteButtons';
import JoinButton from './JoinButton';
import LeaveButton from './LeaveButton';

/** Renders a single card in the Event list. See pages/Event/Event.jsx. */
const EventItem = ({ event, username, userEvents }) => {
  const userEventsID = userEvents.map(userEvent => userEvent.eventID);
  let check = false;
  let ownerEvent = '';
  if (userEventsID.includes(event._id)) {
    check = true;
    const eventOne = userEvents.filter(userEvent => userEvent.eventID === event._id);
    ownerEvent = eventOne[0].eventID;
  }
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{event.title} ({event.typeOfEvent})</Card.Title>
          <Card.Text>
            Date: {event.date.toLocaleDateString()} from {event.startTime} to {event.endTime}
          </Card.Text>
          <Card.Text>Location: {event.location}</Card.Text>
          <Card.Text>Contact Person: {event.name}</Card.Text>
          <Card.Text>Contact Info: {event.email}</Card.Text>
          <Card.Text>Description: {event.description}</Card.Text>
        </Card.Body>
        {username === event.owner ? <EditandDeleteButtons event={event}/> :
        <Container>
          <Row>
            <Col><JoinButton event={event} username={username} check={check} /></Col>
            <Col><LeaveButton ownerEvent={ownerEvent} check={check} /></Col>
          </Row>
        </Container>}
      </Card>
    </Container>
  );
};

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  userEvents: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

/** export EventItem */
export default EventItem;
