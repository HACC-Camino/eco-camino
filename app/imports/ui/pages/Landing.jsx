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
                    height="600"
                    src="/images/landing-page/naturetest2.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                  <h2>Build a Community</h2>
                  <p>Meet with many others who want to also help with the community</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="600"
                    src="/images/landing-page/resized-maskedgirl.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                  <h2>Second slide label</h2>
                  <p>Clean ups</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    height="600"
                    src="/images/landing-page/naturetest3.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                  <h2>Third slide label</h2>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
    );
  }
}

export default Landing;
