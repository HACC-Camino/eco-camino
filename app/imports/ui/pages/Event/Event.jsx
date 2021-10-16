import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Spinner, CardGroup, Row, Tab, Nav, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../../api/event/EventCollection';
import EventItem from '../../components/event/EventItem';
import AddEvent from './AddEvent';

/** Renders a container containing all of the Events documents. */
const Event = ({ events, username, ready }) => (ready ? (
  <Container className='py-sm-3'>
    <h2>Event List</h2>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">View Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Create Events</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <CardGroup>
                <Row xs={1} md={2} className="g-4">
                  {events.map((event) => <EventItem key={event._id} event={event} username={username} />)}
                </Row>
              </CardGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <AddEvent/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </Container>
) :
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

/** Require an array of Event documents in the props. */
Event.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Event documents.
  const username = Meteor.user()?.username;
  const ready = Events.subscribeEventAdmin()
  && username !== undefined;
  const events = Events.getEvenList();
  return {
    ready,
    events,
    username,
  };
})(Event);
