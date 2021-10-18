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
        // <footer id='footer'>
        //   <Row>
        //     <Col>
        //       <BsFacebook size="50px"/>
        //     </Col>
        //     <Col>
        //       <BsTwitter size="50px"/>
        //     </Col>
        //     <Col>
        //       <BsLinkedin size="50px"/>
        //     </Col>
        //   </Row>
        // </footer>
        // <footer>
        //     <div className="container">
        //         <div className="row justify-content-center">
        //             <div className="col-sm-4 col-md-3 item">
        //                 <h3>Services</h3>
        //                 <ul>
        //                     <li><a href="#">Web design</a></li>
        //                     <li><a href="#">Development</a></li>
        //                     <li><a href="#">Hosting</a></li>
        //                 </ul>
        //             </div>
        //             <div className="col-sm-4 col-md-3 item">
        //                 <h3>About</h3>
        //                 <ul>
        //                     <li><a href="#">Company</a></li>
        //                     <li><a href="#">Team</a></li>
        //                     <li><a href="#">Legacy</a></li>
        //                 </ul>
        //             </div>
        //             <div className="col-sm-4 col-md-3 item">
        //                 <h3>Careers</h3>
        //                 <ul>
        //                     <li><a href="#">Job openings</a></li>
        //                     <li><a href="#">Employee success</a></li>
        //                     <li><a href="#">Benefits</a></li>
        //                 </ul>
        //             </div>
        //             <div className="col-lg-3 item social">
        //                 <a href="#"><i className="icon ion-social-facebook"/></a>
        //                 <a href="#"><i className="icon ion-social-twitter"/></a>
        //                 <a href="#"><i className="icon ion-social-snapchat"/></a>
        //                 <a href="#"><i className="icon ion-social-instagram"/></a>
        //                 <p className="copyright">Eco Camino © 2021</p>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#">Web design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">Hosting</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="#">Company</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>Company Name</h3>
                            <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut
                                vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit
                                pulvinar dictum vel in justo.</p>
                        </div>
                        <div className="col item social">
                            <a href="#"><i className="icon ion-social-facebook"/></a>
                            <a href="#"><i className="icon ion-social-twitter"/></a>
                            <a href="#"><i className="icon ion-social-snapchat"/></a>
                            <a href="#"><i className="icon ion-social-instagram"/></a>
                        </div>
                    </div>
                    <p className="copyright">Company Name © 2018</p>
                </div>
            </footer>
        </div>
    );
  }
}

export default Footer;
