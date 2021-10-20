import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import { GetPhoto } from '../aws/GetPhoto';
import ConvertEvent from './ConvertEvent';

/** Renders a single card in the Event list. See pages/Event/Event.jsx. */
const ReportItem = ({ report }) => {
  const username = Meteor.user()?.username;
  const style = '#e7275f';
  return (
    <Container>
      <Card style={{ backgroundColor: style, color: 'white' }}>
        <Card.Body>
          <Card.Img id='imageReport' variant="top" src={GetPhoto(report.accessKey)}/>
          <Card.Title>Report: {report.title}</Card.Title>
          <Card.Text>Date: {report.date.toLocaleDateString()}</Card.Text>
          <Card.Text>Location: {report.location}</Card.Text>
          <Card.Text>Description: {report.description}</Card.Text>
          <br/>
          <br/>
          {username === report.owner ? <DeleteButton report={report} /> : ''}
          <ConvertEvent report={report} />
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
