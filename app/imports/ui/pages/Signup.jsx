import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Header, Message, Segment } from 'semantic-ui-react';
// import swal from 'sweetalert';
import { Col, InputGroup, Row, FormControl, Form, Container } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
// import { userDefineMethod } from '../../api/user/UserCollection.methods';

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
    // const dateJoined = new Date();
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
        // userDefineMethod.call({ firstName, lastName, bio, areaCode, dateJoined, owner: email },
        //     (error) => {
        //       if (error) {
        //         swal('Error', error.message, 'error');
        //         // console.error(error.message);
        //       } else {
        //         swal('Success', 'Item added successfully', 'success');
        //         // formRef.reset();
        //         // console.log('Success');
        //       }
        //     });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container style={{ paddingBottom: '60px' }}>
        <h2>Register your account</h2>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">
              First Name
            </Form.Label>
            <InputGroup className="mb-3">
              <FormControl placeholder='FirstName' value="firstName" onChange={this.handleChange} />
            </InputGroup>
          </Col>
        </Row>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
