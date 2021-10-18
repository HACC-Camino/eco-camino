import React from 'react';
import PropTypes from 'prop-types';
// import { Link, Redirect } from 'react-router-dom';
// import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Container, Col, Form, FormControl, InputGroup, Row, Button } from 'react-bootstrap';
// import Select from 'react-select';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // // if correct authentication, redirect to from: page instead of signup screen
    // if (this.state.redirectToReferer) {
    //   return <Redirect to={from}/>;
    // }
    return (
        <Container style={{ paddingBottom: '60px', paddingTop: '60px' }}>
          <h2>Sign Up</h2>
          <Row>
            <Col>
              <Form.Label htmlFor="basic-url">First Name</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='First' />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label htmlFor="basic-url">Last Name</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Last' />
              </InputGroup>
            </Col>
            <Row>
              <Form.Label htmlFor="basic-url">E-Mail</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='e-mail' />
              </InputGroup>
            </Row>
            <Row>
              <Form.Label htmlFor="basic-url">Password</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Password' />
              </InputGroup>
            </Row>
            <Row>
              <Form.Label htmlFor="basic-url">Zip Code</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Zip Code' />
              </InputGroup>
            </Row>
            <Row>
              <Form.Label htmlFor="basic-url">Bio</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Tell us about yourself..' />
              </InputGroup>
            </Row>
          </Row>
          <br />
          <Button variant="primary" size="lg">
            Sign Up
          </Button>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
