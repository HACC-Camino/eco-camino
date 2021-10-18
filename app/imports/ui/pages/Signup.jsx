import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Col, InputGroup, Row, FormControl, Form, Container, Button } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { userDefineMethod } from '../../api/user/UserCollection.methods';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [zipCode, setZipCode] = useState('');

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const history = useHistory();
  const goToPage = () => {
    const pageLink = '/profile';
    history.push(pageLink);
  };
  const submit = () => {
    const dateJoined = new Date();
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        userDefineMethod.call({ firstName, lastName, bio, zipCode, dateJoined, owner: email },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
                // console.error(error.message);
              } else {
                swal('Success', 'Item added successfully', 'success');
                // console.log('Success');
              }
            });
        goToPage();
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
    return (
        <Container style={{ paddingBottom: '60px', paddingTop: '60px' }}>
          <h2>Sign Up</h2>
          <Row>
            <Col>
              <Form.Label htmlFor="basic-url">First Name</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='First' onChange={ e => setFirstName(e.target.value) } />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label htmlFor="basic-url">Last Name</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Last' onChange={ e => setLastName(e.target.value) }/>
              </InputGroup>
            </Col>
            <Row>
              <Form.Label htmlFor="basic-url">E-Mail</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='e-mail' onChange={ e => setEmail(e.target.value) }/>
              </InputGroup>
            </Row>
            <Row>
              <Form.Label htmlFor="basic-url">Password</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Password' type="password" onChange={ e => setPassword(e.target.value)} />
              </InputGroup>
            </Row>
            <Row>
              <Form.Label htmlFor="basic-url">Zip Code</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Zip Code' type="number" onChange={ e => setZipCode(e.target.value)} />
              </InputGroup>
            </Row>
            <Row>
              <Form.Label htmlFor="basic-url">Bio</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder='Tell us about yourself..' as="textarea"
                             rows={5} onChange={ e => setBio(e.target.value)} />
              </InputGroup>
            </Row>
          </Row>
          <br />
          <Button variant="primary" size="lg" onClick={submit}>
            Sign Up
          </Button>
        </Container>
    );
  // }
};

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
