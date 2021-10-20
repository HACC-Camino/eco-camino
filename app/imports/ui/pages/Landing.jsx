import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { BsCalendar2EventFill, MdForum, MdReportGmailerrorred } from 'react-icons/all';

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
                    src="/images/landing-page/naturetest5.jpg"
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
          <Row className="pt-md-4">
            <Col style={textStyle} xs="6" sm="4" >
              <Card text="dark" className="card text-white bg-secondary mb-2">
                <Card.Body>
                  <Card.Title>Events</Card.Title>
                  <a>
                    <BsCalendar2EventFill size="50px"/>
                  </a>
                  <Card.Text>
                    {/* eslint-disable-next-line max-len */}
                   Users can create and attend events such as workshops or cleanups. Users who want to create events will need to wait for approval by an administrator.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" sm="4">
              <Card text="dark" className="card text-white bg-secondary mb-2">
                <Card.Body>
                  <Card.Title>Forums</Card.Title>
                  <a>
                    <MdForum size="50px"/>
                  </a>
                  <Card.Text>
                    {/* eslint-disable-next-line max-len */}
                    Users can create and reply to posts from many others who have the same questions or answers about our environment. Forums will always be well monitored.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" sm="4">
              <Card text="dark" className="card text-white bg-secondary mb-2">
                <Card.Body>
                  <Card.Title>Report System</Card.Title>
                  <a>
                    <MdReportGmailerrorred size="50px"/>
                  </a>
                  <Card.Text>
                    {/* eslint-disable-next-line max-len */}
                    Users can report spotted trash and request assistance using our Report page. Users have the ability to also upload pictures of Trash that needs to be picked up.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        </Container>
    );
  }
}

export default Landing;
