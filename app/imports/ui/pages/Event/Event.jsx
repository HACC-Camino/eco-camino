import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Spinner, CardGroup, Row, Tab, Nav, Col, Tabs } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../../api/event/EventCollection';
import { UserEvents } from '../../../api/user/UserEventCollection';
import EventItem from '../../components/event/EventItem';
import AddEvent from './AddEvent';
import DisplayMap from '../../components/map/DisplayMap';

/** Renders a container containing all of the Events documents. */
const Event = ({ currentEvents, currentCleanups, currentWorkshops, joinedEvents,
                 ownedEvents, userEvents, ready }) => (ready ? (
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
              <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="All" title="All" style={{ paddingBottom: '60px' }}>
                  <CardGroup>
                    <Row style={{ width: '100%' }}>
                      <DisplayMap eventList={currentEvents} />
                    </Row>
                    <Row xs={1} md={2} className="g-4">
                      {currentEvents.map((event) => <EventItem key={event._id}
                                                               event={event} userEvents={userEvents} />)}
                    </Row>
                  </CardGroup>
                </Tab>
                <Tab eventKey="Only Cleanups" title="Only Cleanups">
                  <CardGroup>
                    <Row xs={1} md={2} className="g-4">
                      {currentCleanups.map((event) => <EventItem key={event._id}
                                                                 event={event} userEvents={userEvents} />)}
                    </Row>
                  </CardGroup>
                </Tab>
                <Tab eventKey="Only Workshops" title="Only Workshops">
                  <CardGroup>
                    <Row xs={1} md={2} className="g-4">
                      {currentWorkshops.map((event) => <EventItem key={event._id}
                                                                 event={event} userEvents={userEvents} />)}
                    </Row>
                  </CardGroup>
                </Tab>
                <Tab eventKey="Owned Events" title="Owned Events">
                  <CardGroup>
                    <Row xs={1} md={2} className="g-4">
                      {ownedEvents.map((event) => <EventItem key={event._id}
                                                                 event={event} userEvents={userEvents} />)}
                    </Row>
                  </CardGroup>
                </Tab>
                <Tab eventKey="Joined Events" title="Joined Events">
                  <CardGroup>
                    <Row xs={1} md={2} className="g-4">
                      {joinedEvents.map((event) => <EventItem key={event._id}
                                                             event={event} userEvents={userEvents} />)}
                    </Row>
                  </CardGroup>
                </Tab>
              </Tabs>
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
  userEvents: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentEvents: PropTypes.array.isRequired,
  currentCleanups: PropTypes.array.isRequired,
  currentWorkshops: PropTypes.array.isRequired,
  ownedEvents: PropTypes.array.isRequired,
  joinedEvents: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Event documents.
  const username = Meteor.user()?.username;
  const ready = Events.subscribeEventAdmin().ready()
  && UserEvents.subscribeUserEvent()
  && username !== undefined;
  const currentEvents = Events.getCurrentEvents();
  const currentCleanups = Events.getCurrentCleanups();
  const currentWorkshops = Events.getCurrentWorkshops();
  const ownedEvents = Events.getCurrentOwnedWorkshops(username);
  const userEvents = UserEvents.getUserEvent(username);
  const joinedEvents = UserEvents.getUserJoinedEvent(currentEvents, username);
  return {
    ready,
    currentEvents,
    currentCleanups,
    currentWorkshops,
    ownedEvents,
    username,
    userEvents,
    joinedEvents,
  };
})(Event);
