import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EventItem = ({ event }) => {
  console.log(event);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>Date: {event.date.toLocaleDateString()}</Card.Text>
        <Card.Text>Location: {event.location}</Card.Text>
        <Card.Text>Contact Person: {event.owner}</Card.Text>
        <Card.Text>Contact Info: {event.email}</Card.Text>
        <Card.Text>Description: {event.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default EventItem;
