import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../../api/event/EventCollection';
import EventItem from '../../components/event/EventItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Event = ({ events, ready }) => (ready ? (
  <Container>
    <Header as="h2" textAlign="center">Even List</Header>
      {events.map((event) => <EventItem key={event._id} event={event} />)}
  </Container>
) : <Loader active>Getting User Data</Loader>
);

/** Require an array of Stuff documents in the props. */
Event.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Events.subscribeEventAdmin();
  return {
    events: Events.find({}, {}).fetch(),
    ready: subscription.ready(),
  };
})(Event);
