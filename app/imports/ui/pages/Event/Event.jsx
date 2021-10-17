import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Spinner, CardGroup, Row, Tab, Nav, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../../api/event/EventCollection';
import { UserEvents } from '../../../api/user/UserEventCollection';
import EventItem from '../../components/event/EventItem';
import DisplayMap from '../../components/map/DisplayMap';

/** Renders a container containing all of the Events documents. */
const Event = ({ currentEvents, currentCleanups, currentWorkshops, joinedEvents,
                 ownedEvents, userEvents, ready }) => {
  if (ready) {
    return (
    <Container className='py-sm-3'>
      <h2>Event List</h2>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">All Events</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Only Cleanups</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Only Workshops</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Owned Events</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Joined Events</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first" style={{ paddingBottom: '60px' }}>
                <h2>All Events</h2>
                <CardGroup>
                  <Row style={{ width: '100%' }}>
                     <DisplayMap eventList={currentEvents} userEvents={userEvents} />
                  </Row>
                  <Row xs={1} md={2} className="g-4">
                    {currentEvents.map((event) => <EventItem key={event._id}
                                                             event={event} userEvents={userEvents} />)}
                  </Row>
                </CardGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="second" style={{ paddingBottom: '60px' }}>
                <h2>Only Cleanups</h2>
                <CardGroup>
                  <Row style={{ width: '100%' }}>
                    {/* <DisplayMap eventList={currentCleanups} userEvents={userEvents} /> */}
                  </Row>
                  <Row xs={1} md={2} className="g-4">
                    {currentCleanups.map((event) => <EventItem key={event._id}
                                                               event={event} userEvents={userEvents} />)}
                  </Row>
                </CardGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="third" style={{ paddingBottom: '60px' }}>
                <h2>Only Workshops</h2>
                <CardGroup>
                  <Row style={{ width: '100%' }}>
                    {/* <DisplayMap eventList={currentWorkshops} userEvents={userEvents} /> */}
                  </Row>
                  <Row xs={1} md={2} className="g-4">
                    {currentWorkshops.map((event) => <EventItem key={event._id}
                                                                event={event} userEvents={userEvents} />)}
                  </Row>
                </CardGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth" style={{ paddingBottom: '60px' }}>
                <h2>Owned Events</h2>
                <CardGroup>
                  <Row style={{ width: '100%' }}>
                    {/* <DisplayMap eventList={ownedEvents} userEvents={userEvents} /> */}
                  </Row>
                  <Row xs={1} md={2} className="g-4">
                    {ownedEvents.map((event) => <EventItem key={event._id}
                                                           event={event} userEvents={userEvents} />)}
                  </Row>
                </CardGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="fifth" style={{ paddingBottom: '60px' }}>
                <h2>Joined Events</h2>
                <CardGroup>
                  <Row style={{ width: '100%' }}>
                    {/* <DisplayMap eventList={joinedEvents} userEvents={userEvents} /> */}
                  </Row>
                  <Row xs={1} md={2} className="g-4">
                    {joinedEvents.map((event) => <EventItem key={event._id}
                                                            event={event} userEvents={userEvents} />)}
                  </Row>
                </CardGroup>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
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
