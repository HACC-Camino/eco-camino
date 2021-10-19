import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const Signout = () => {
    Meteor.logout();
    const history = useHistory();
    const goToPage = () => {
      const pageLink = '/';
      history.push(pageLink);
    };
    goToPage();
    return (
      <Container id="page-container">
        <h2 style={{ textAlign: 'center' }}>
          You are signed out.
        </h2>
      </Container>
    );
  };
export default Signout;
