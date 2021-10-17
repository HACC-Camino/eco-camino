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
        <Navbar bg="dark" variant="dark" expand="lg" >
          <Navbar.Brand href="#"> <img alt=""
                                       src="/images/camino_logo.png"
                                       width="30"
                                       height="30"
                                       className="d-inline-block align-top"/>{''} EcoCamino
          </Navbar.Brand>
          <Nav className="me-auto">
            {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') === false ? (
                [<Nav.Link href="#event" key='events'>Events</Nav.Link>,
                  <Nav.Link href="#forum" key='forums'>Forums</Nav.Link>,
                  <Nav.Link href="#profile" key='profile'>Profile</Nav.Link>]
            ) : ''}
            {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                [<Nav.Link href="#event" key='events'>Events</Nav.Link>,
                  <Nav.Link href="#forum" key='forums'>Forums</Nav.Link>,
                  <Nav.Link href="#profile" key='profile'>Dashboard</Nav.Link>,
                  <Nav.Link href="#admin" key='admin'>User List</Nav.Link>,
                  <Nav.Link href="#admin-list" key='admin-list'>Admin List</Nav.Link>,
                ]
            ) : ''}
            <Nav.Link href="#resources" key='resources'>Resources</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {this.props.currentUser === '' ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
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
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    {this.props.currentUser}
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/Signout" active>
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
