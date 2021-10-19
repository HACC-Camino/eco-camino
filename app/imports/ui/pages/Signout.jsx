import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Container className="pt-sm-3" id="page-container">
        <h2 style={{ textAlign: 'center' }}>
          <p>You are signed out.</p>
        </h2>
      </Container>
    );
  }
}
