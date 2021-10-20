import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../../api/event/EventCollection';
import EventItem from '../../components/event/EventItem';

/** Renders a container containing all of the Events documents. */
const Event = ({ pendingEvents, ready }) => {
  if (ready) {
    return (
    <Container id="page-container">
      <h2>Event Approval List</h2>
        <Row>
          <Col>
            <Row xs={1} md={2} className="g-4">
              {pendingEvents.map((event) => <EventItem key={event._id}
                                                       event={event} userEvents={['']} />)}
            </Row>
          </Col>
        </Row>
    </Container>
    );
  }
    return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    );

};

/** Require an array of Event documents in the props. */
Event.propTypes = {
  ready: PropTypes.bool.isRequired,
  pendingEvents: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Event documents.
  const username = Meteor.user()?.username;
  const ready = Events.subscribeEventAdmin().ready()
  && username !== undefined;
  const pendingEvents = Events.getAllPendingEvents();
  return {
    ready,
    pendingEvents,
  };
})(Event);
