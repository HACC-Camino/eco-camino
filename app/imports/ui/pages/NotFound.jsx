import React from 'react';
import { Container } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
      <Container id="page-container">
        <h2 style={{ textAlign: 'center' }}>
          Page not found
        </h2>
      </Container>
    );
  }
}

export default NotFound;
