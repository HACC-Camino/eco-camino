import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const textStyle = { textAlign: 'center' };
class Resources extends React.Component {
  render() {
    return (
        <Container className="py-sm-3">
          <Row className="pb-sm-2">
              <Col style={textStyle} xs="6" sm="4" >Column</Col>
              <Col style={textStyle} xs="6" sm="4">Column</Col>
              <Col style={textStyle} sm="4">Column</Col>
          </Row>
        </Container>
    );
  }
}

export default Resources;
