import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EventItem = ({ event }) => (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
              Date: {event.date.toLocaleDateString()} from {event.startTime} to {event.endTime}
            </Card.Text>
            <Card.Text>Location: {event.location}</Card.Text>
            <Card.Text>Contact Person: {event.name}</Card.Text>
            <Card.Text>Contact Info: {event.email}</Card.Text>
            <Card.Text>Description: {event.description}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
  );

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default EventItem;
