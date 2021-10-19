import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
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

    );
  }
}

export default Landing;
