import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomPagination from '../CustomPagination';

const renderPastEvents = (past_events, index) => (
  <tr className='d-flex' key={index}>
      <th className='col-2'>{index}</th>
      <th className='col-7'>{past_events.title}</th>
      <th className='col-3'>{past_events.date.toLocaleDateString()}</th>
  </tr>
);

const PastEvents = ({ past_events }) => {
    const maxRow = 5;
    const [rows, setRows] = useState(past_events.slice(0, maxRow));
    const handlePageCallback = (childRows) => {
        setRows(childRows);
    };
    // max rows per page.
    return (
        <div className='container-lg'>
            <Table className='table' bordered responsive striped hover>
                <thead>
                <tr className='d-flex'>
                    <th className='col-2'>#</th>
                    <th className='col-7'>Event</th>
                    <th className='col-3'>Time</th>
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
