import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const textStyle = { textAlign: 'center' };
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container className="p0 m0" id="landing-container">
          <Row className="p0 m0">
            <Carousel fade >
              <Carousel.Item>
                <img
                    className="d-block w-100 imageDark"
                    height="675"
                    src="/images/landing-page/naturetest2.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                  <h1 className="text-success">Build a Community</h1>
                  <p className="text-success">Meet with many others who want to also help with the community</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100 imageDark"
                    height="675"
                    src="/images/landing-page/resized-maskedgirl.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                  <h1 className="text-success">Host/Attend Events</h1>
                  {/* eslint-disable-next-line max-len */}
                  <p className="text-success">Users have the ability to host or attend events that they are interested in</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100 imageDark"
                    height="675"
                    src="/images/landing-page/naturetest3.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                  <h1 className="text-success">Learn about how to protect our environment</h1>
                  <p className="text-success">If you&apos;d like to share your experiences or interesting
                    facts you can go to the Forums to search through what interests you!</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100 imageDark"
                    height="675"
                    src="/images/landing-page/naturetest4.jpg"
                    alt="Fourth slide"
                />
                <Carousel.Caption>
                  <h1 className="text-success">Talk to others on the Forums</h1>
                  {/* eslint-disable-next-line max-len */}
                  <p className="text-success">Introduce your worries and questions in the Forums to connect you with others who also have the same worries</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row className="pb-sm-3">
            <Col style={textStyle} xs="6" sm="4" >
              <Card text="dark" className="mb-2">
                <Card.Header>Tip #2</Card.Header>
                <Card.Body>
                  <Card.Title>Ways to save water</Card.Title>
                  <Card.Text>
                    A recommended website about how to save our limited supply of water all around the world.
                  </Card.Text>
                  {/* eslint-disable-next-line max-len */}
                  <Button variant="success" href="https://friendsoftheearth.uk/sustainable-living/13-best-ways-save-water">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" sm="4">
              <Card text="dark" className="mb-2">
                <Card.Header>Tip #2</Card.Header>
                <Card.Body>
                  <Card.Title>Learn about growing your own plants</Card.Title>
                  <Card.Text>
                    Instead of going to the grocery store to buy some vegetables, why not grow them in your backyard?
                  </Card.Text>
                  {/* eslint-disable-next-line max-len */}
                  <Button variant="success" href="https://blog.backtotheroots.com/2020/12/21/grow-your-own-food/">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" sm="4">
              <Card text="dark" className="mb-2 ">
                <Card.Header>Tip #3</Card.Header>
                <Card.Body>
                  <Card.Title>Reduce, Reuse, Recycle!</Card.Title>
                  <Card.Text>
                    {/* eslint-disable-next-line max-len */}
                    A simple but effective practice to help save our already decline world that everyone should have knowledge of.
                  </Card.Text>
                  <Button variant="success" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        </Container>
    );
  }
}

export default Landing;
