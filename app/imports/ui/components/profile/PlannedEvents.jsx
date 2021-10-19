import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const renderEvents = (my_sorted_events_list, index) => (
    <tr className='d-flex' key={index}>
        <th className='col-2'>{index}</th>
        <th className='col-7'>{my_sorted_events_list.title}</th>
        <th className='col-3'>{my_sorted_events_list.date.toLocaleDateString()}</th>
    </tr>
);

const PlannedEvents = ({ my_sorted_events_list }) => (
    <div className='container-lg'>
        <Table className='table' bordered responsive striped hover>
            <thead>
            <tr className='d-flex'>
                <th className='col-2'>#</th>
                <th className='col-7'>Event</th>
                <th className='col-3'>Time</th>
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
