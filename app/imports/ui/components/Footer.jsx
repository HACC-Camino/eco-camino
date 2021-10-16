import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '80px' };
    const rowStyle = { paddingTop: '50px', paddingBottom: '30px' };
    return (
        <footer>
          <Container>
            <Row style={ divStyle }>
              <Col > </Col>
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
                  <div className="in-line" style={ rowStyle }>
                  <Row>
                    <Col xs={2}>
                    <a href="/"><h5 >Info</h5></a>
                    </Col>
                    <Col xs={2}>
                    <a href="/"> <h5>Support</h5></a>
                    </Col>
                    <Col xs={1}>
                    <a href="/"> <h5>Partnerships</h5></a>
                    </Col>
                  </Row>
                  <Row>
                    <div><h5>Terms & Conditions</h5></div>
                    <div><h5>Privacy Policy</h5></div>
                  </Row>
                </div>
                </Container>
              </Col>
              <Col > </Col>
            </Row>
          </Container>
        </footer>
    );
  }
}

export default Footer;
