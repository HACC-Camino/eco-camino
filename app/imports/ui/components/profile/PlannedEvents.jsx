import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const renderEvents = (my_sorted_events_list, index) => (
    <tr>
        <th>{index}</th>
        <th>{my_sorted_events_list.title}</th>
        <th>{my_sorted_events_list.date.toLocaleDateString()}</th>
    </tr>
);

const PlannedEvents = ({ my_sorted_events_list }) => (
    <div className='container-lg'>
        <Table className='table' bordered responsive striped hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Event</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
                {my_sorted_events_list.map(renderEvents)}
            </tbody>
        </Table>
    </div>
);

PlannedEvents.propTypes = {
    my_sorted_events_list: PropTypes.array,
};

export default PlannedEvents;
