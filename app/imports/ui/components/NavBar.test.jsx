import { Meteor } from 'meteor/meteor';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { defineTestUser, logOutUser, withLoggedInUser } from '../../test-utils/test-utilities';
import NavBar from './NavBar';

configure({ adapter: new Adapter() });

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('NavBar', function testSuite() {
    it('should render logged out', function test1() {
      const wrapper = mount(<Router><NavBar/></Router>);
      expect(wrapper.find('a').at(0).text()).to.equal('meteor-application-template');
      expect(wrapper.find('a').at(1).text()).to.equal('Sign In');
      expect(wrapper.find('a').at(2).text()).to.equal('Sign Up');
    });

    it('should render logged in as normal user', async function test2() {
      const { username, password } = await defineTestUser.callPromise();
      await withLoggedInUser({
        username,
        password,
      });
      const wrapper = mount(<Router><NavBar/></Router>);
      expect(wrapper.find('a')).to.have.lengthOf(4);
      expect(wrapper.find('a').at(0).text()).to.equal('meteor-application-template');
      expect(wrapper.find('a').at(1).text()).to.equal('Add Stuff');
      expect(wrapper.find('a').at(2).text()).to.equal('List Stuff');
      expect(wrapper.find('a').at(3).text()).to.equal('Sign Out');
      await logOutUser();
    });
  });
}
