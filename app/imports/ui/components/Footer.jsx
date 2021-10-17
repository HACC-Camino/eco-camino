import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
          // <Container id='footer'>
          //   <Row >
          //     <Col lg>
          //     <Col>
          //       <div className="in-line" >
          //         <Container>
          //         <Row>
          //             <a href="/"><h5 >Info</h5></a>
          //             <a href="/"> <h5>Support</h5></a>
          //             <a href="/"> <h5>Partnerships</h5></a>
          //         </Row>
          //         <Row>
          //           <a href="/"><h5>Terms & Conditions</h5></a>
          //         </Row>
          //         <Row>
          //           <a href="/"><h5>Privacy Policy</h5></a>
          //         </Row>
          //         </Container>
          //       </div>
          //     </Col>
          //     </Col>
          //     <Col lg>
          //     <Col>
          //       <Container>
          //         <Row>
          //           <Col xs={5}>
          //             <BsFacebook size="50px"/>
          //           </Col>
          //           <Col xs={5}>
          //             <BsTwitter size="50px"/>
          //           </Col>
          //           <Col xs={1}>
          //             <BsLinkedin size="50px"/>
          //           </Col>
          //         </Row>
          //       </Container>
          //     </Col>
          //     </Col>
          //     <Col lg>
          //     {/*<Col > </Col>*/}
          //     </Col>
          //   </Row>
          // </Container>
        <footer id='footer'>
          <Row>
            <Col>
              <BsFacebook size="50px"/>
            </Col>
            <Col>
              <BsTwitter size="50px"/>
            </Col>
            <Col>
              <BsLinkedin size="50px"/>
            </Col>
          </Row>
        </footer>
    );
  }
}

export default Footer;
