import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const textStyle = { textAlign: 'center' };
class Resources extends React.Component {
  render() {
    return (
        <Container className="py-sm-3" id="page-container">
          <Row className="py-sm-3">
            <h1 style={textStyle}>Resources</h1>
          </Row>
          <Row className="pb-sm-2">
              <Col style={textStyle} xs="6" sm="4" >
                <Card text="dark" style={{ width: '18 rem' }} className="mb-2">
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
                <Card text="dark" style={{ width: '18 rem' }} className="mb-2">
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
                <Card text="dark" style={{ width: '18 rem' }} className="mb-2">
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
            <Col style={textStyle} xs="6" md="4" >
              <Card text="dark" style={{ width: '30rem' }} className="mb-2">
                {/* eslint-disable-next-line max-len */}
                <Card.Img variant="top" src="/images/resource-page/sustainable_hawaii1.jpg" className="hawaiiConserve" />
                <Card.Body>
                  <Card.Title>Sustainable Coastlines Hawaii</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                  </Card.Text>
                  <Button variant="primary" href="https://www.sustainablecoastlineshawaii.org/">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" md="4" >
              <Card text="dark" style={{ width: '30rem' }} className="mb-2">
                <Card.Img variant="top" src="/images/resource-page/kupu_logo.jpg" className="hawaiiConserve"/>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card></Col>
            <Col style={textStyle} xs="6" md="4" >
              <Card text="dark" style={{ width: '30rem' }} className="mb-2">
                <Card.Img variant="top" src="/images/resource-page/trees2_629x661.jpg" />
                <Card.Body>
                  <Card.Title>Trees For Honolulu's Future</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card></Col>
          </Row>
        </Container>
    );
  }
}

export default Resources;
