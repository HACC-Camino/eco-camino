import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const renderPastEvents = (past_events, index) => (
  <tr key={index}>
      <th>{index}</th>
      <th>{past_events.title}</th>
      <th>{past_events.date.toLocaleDateString()}</th>
  </tr>
);

const PastEvents = ({ past_events }) => (
    <div className='container-lg'>
        <Table className='table' bordered responsive striped hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Event</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody key={past_events.id}>
                {past_events.map(renderPastEvents)}
            </tbody>
        </Table>
    </div>
);

PastEvents.propTypes = {
    past_events: PropTypes.array,
};

export default PastEvents;
