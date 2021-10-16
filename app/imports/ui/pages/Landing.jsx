import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
            <Carousel fade>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="675"
                    src="/images/landing-page/naturetest2.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                  <h1>Build a Community</h1>
                  <p>Meet with many others who want to also help with the community</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="675"
                    src="/images/landing-page/resized-maskedgirl.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                  <h1>Host/Attend Events</h1>
                  <p>Users have the ability to host or attend events that they are interested in</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="675"
                    src="/images/landing-page/naturetest3.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                  <h1>Learn about how to protect our environment</h1>
                  <p>If you&apos;d like to share your experiences or interesting
                    facts you can go to the Forums to search through what interests you!</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

    );
  }
}

export default Landing;
