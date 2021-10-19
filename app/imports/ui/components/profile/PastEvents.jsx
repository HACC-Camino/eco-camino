import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomPagination from '../CustomPagination';

const renderPastEvents = (past_events, index) => (
  <tr key={index}>
      <th>{index}</th>
      <th>{past_events.title}</th>
      <th>{past_events.date.toLocaleDateString()}</th>
  </tr>
);

const PastEvents = ({ past_events }) => {
    const [rows, setRows] = useState([]);
    const handlePageCallback = (childRows) => {
        setRows(childRows);
    };
    // max rows per page.
    const maxRow = 5;
    return (
        <div className='container-lg'>
            <Table className='table' bordered responsive striped hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody key={rows.id}>
                {rows.map(renderPastEvents)}
                </tbody>
            </Table>
            <CustomPagination maxRows={maxRow} arrayObjects={past_events} parentCallback={handlePageCallback}/>
        </div>
    );
};

PastEvents.propTypes = {
    past_events: PropTypes.array,
};

export default PastEvents;
