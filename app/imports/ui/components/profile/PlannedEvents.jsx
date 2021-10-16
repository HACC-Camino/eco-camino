import React from 'react';
import { Table } from 'react-bootstrap';

class PlannedEvents extends React.Component {
    render() {
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
                <tbody>
                    <td>1</td>
                    <td>Beach Cleanup (Ala Moana)</td>
                    <td>October 28 2021 9:00 AM</td>
                </tbody>
                <tbody>
                    <td>2</td>
                    <td>Forest Cleanup (Aiea)</td>
                    <td>November 3 2021 9:00 AM</td>
                </tbody>
                <tbody>
                    <td>3</td>
                    <td>Park Cleanup (Ala Moana)</td>
                    <td>November 15 2021 9:00 AM</td>
                </tbody>
            </Table>
            </div>
        );
    }
}

export default PlannedEvents;
