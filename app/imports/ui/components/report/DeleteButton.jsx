import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { reportRemoveItMethod } from '../../../api/report/ReportCollection.methods';

/** Renders an Edit and Delete Button */
const DeleteButtons = ({ report }) => {
  const deleteHandle = () => {
    const _id = report._id;
    reportRemoveItMethod.call({ _id },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report Deleted Successfully', 'success');
      }
    });
  };
  return (
    <Container style={{ paddingBottom: '10px' }}>
      <Row>
        <Col><Button variant="danger" onClick={deleteHandle}>Delete</Button></Col>
      </Row>
    </Container>
  );
};

/** Require a document to be passed to this component. */
DeleteButtons.propTypes = {
  report: PropTypes.object.isRequired,
};

/** export EventItem */
export default DeleteButtons;
