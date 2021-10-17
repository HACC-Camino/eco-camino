import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar1 extends React.Component {
  render() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className='px-3'>
          <Navbar.Brand href="#"> <img alt=""
                                       src="/images/camino_logo.png"
                                       width="30"
                                       height="30"
                                       className="d-inline-block align-top"/>{''} EcoCamino
          </Navbar.Brand>
          <Nav className="me-auto">
            {this.props.currentUser ? (
                [<Nav.Link href="#event" key='events'>Events</Nav.Link>,
                  <Nav.Link href="#addEvent" key='addEvent'>Add Events</Nav.Link>,
                  <Nav.Link href="#forum" key='forums'>Forums</Nav.Link>,
                  <Nav.Link href="#profile" key='profile'>Profile</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Nav.Link href="#admin" key='admin'>Admin</Nav.Link>
            ) : ''}
            <Nav.Link href="#resources" key='resources'>Resources</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {this.props.currentUser === '' ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-dark">
                    Login
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/Signin" active>
                      Sign-in
                    </Dropdown.Item>
                    <Dropdown.Item href="#/Signup">Signup</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-dark">
                    {this.props.currentUser}
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/Signout" active variant='outline-dark'>
                      Signout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Nav>
        </Navbar>
    );
  }
}

/** Declare the types of all properties. */
NavBar1.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar1);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
