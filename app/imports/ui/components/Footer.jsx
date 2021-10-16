import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '80px' };
    const rowStyle = { paddingTop: '10px', paddingBottom: '30px' };
    return (
        <footer>
          <Container>
            <Row style={ divStyle }>
              <div className='col-lg-8-auto'>
              <Col>
                <div className="in-line" style={ rowStyle }>
                  <Container>
                  <Row>
                      <a href="/"><h5 >Info</h5></a>
                      <a href="/"> <h5>Support</h5></a>
                      <a href="/"> <h5>Partnerships</h5></a>
                  </Row>
                  <Row>
                    <a href="/"><h5>Terms & Conditions</h5></a>
                  </Row>
                  <Row>
                    <a href="/"><h5>Privacy Policy</h5></a>
                  </Row>
                  </Container>
                </div>
              </Col>
              </div>
              <div className='col-lg-8-auto'>
              <Col>
                <Container>
                  <Row>
                    <Col xs={5}>
                      <BsFacebook size="50px"/>
                    </Col>
                    <Col xs={5}>
                      <BsTwitter size="50px"/>
                    </Col>
                    <Col xs={1}>
                      <BsLinkedin size="50px"/>
                    </Col>
                  </Row>
                </Container>
              </Col>
              </div>
              <div className='col-lg-8-auto'>
              <Col > </Col>
              </div>
            </Row>
          </Container>
        </footer>
    );
  }
}

export default Footer;
