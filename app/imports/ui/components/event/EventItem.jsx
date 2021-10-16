import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EditandDeleteButtons from './EditAndDeleteButtons';

/** Renders a single card in the Event list. See pages/Event/Event.jsx. */
const EventItem = ({ event, username }) => (
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

          {username === event.owner ? <EditandDeleteButtons event={event}/> : ' '}
        </Card>
      </Container>
  );

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

/** export EventItem */
export default EventItem;
