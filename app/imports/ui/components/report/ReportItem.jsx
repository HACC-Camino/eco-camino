import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

/** Renders a single card in the Event list. See pages/Event/Event.jsx. */
const ReportItem = ({ report }) => {
  const style = '#ffe7ba';
  return (
    <Container>
      <Card style={{ backgroundColor: style }}>
        <Card.Body>
          <Card.Title>{report.title}</Card.Title>
          <Card.Text>Location: {report.location}</Card.Text>
          <Card.Text>Description: {report.description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

/** Require a document to be passed to this component. */
ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
};

/** export EventItem */
export default ReportItem;
