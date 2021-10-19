import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#resources">Resources</a></li>
                                <li><a href="https://github.com/HACC-Camino/eco-camino">Development</a></li>
                                <li><a href="#">Hosting</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About us</h3>
                            <ul>
                                <li><a href="#">ECOCamino</a></li>
                                <li><a href="https://github.com/HACC-Camino/eco-camino#readme">The Team</a></li>
                                <li><a href="https://github.com/HACC-Camino">Github Organization</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>ECOCamino</h3>
                            <p>A new startup to help others on what they can do environmentally to help our
                              depleting world.
                              Created by 5 Computer Science students at the University of Hawaii at Manoa.</p>
                        </div>
                        <div className="col item social">
                            <a href="#"><i className="icon ion-social-facebook"/></a>
                            <a href="#"><i className="icon ion-social-twitter"/></a>
                            <a href="#"><i className="icon ion-social-snapchat"/></a>
                            <a href="#"><i className="icon ion-social-instagram"/></a>
                        </div>
                    </div>
                    <p className="copyright">ECOCamino © 2021</p>
                </div>
            </footer>
        </div>
    );
  }
}

export default Footer;
