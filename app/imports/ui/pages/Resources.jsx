import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const textStyle = { textAlign: 'center' };
class Resources extends React.Component {
  render() {
    return (
        <Container className="py-sm-3">
          <Row className="py-sm-3">
            <h1 style={textStyle}>Resources</h1>
          </Row>
          <Row className="pb-sm-2">
              <Col style={textStyle} xs="6" sm="4" >
                <Card text="light" style={{ width: '18 rem' }} className="mb-2">
                  <Card.Header>Tip #2</Card.Header>
                  <Card.Body>
                    <Card.Title>Ways to save water</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the cards content.
                    </Card.Text>
                    <Button variant="success" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col style={textStyle} xs="6" sm="4">
                <Card text="light" style={{ width: '18 rem' }} className="mb-2">
                  <Card.Header>Tip #2</Card.Header>
                  <Card.Body>
                    <Card.Title>Learn about growing your own plants</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the cards content.
                    </Card.Text>
                    <Button variant="success" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col style={textStyle} sm="4">
                <Card text="light" style={{ width: '18 rem' }} className="mb-2">
                  <Card.Header>Tip #3</Card.Header>
                  <Card.Body>
                    <Card.Title>Reduce, Reuse, Recycle!</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the cards content.
                    </Card.Text>
                    <Button variant="success" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        <Row className="py-sm-3">
          <h3 style={textStyle}>Organizations</h3>
        </Row>
          <Row>
            <Col style={textStyle} xs="6" sm="4" >
              <Card style={{ width: '30rem' }} className="mb-2">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" sm="4" >
              <Card style={{ width: '30rem' }} className="mb-2">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card></Col>
            <Col style={textStyle} sm="4" >
              <Card style={{ width: '30rem' }} className="mb-2">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card></Col>
          </Row>
        </Container>
    );
  }
}

export default Resources;
