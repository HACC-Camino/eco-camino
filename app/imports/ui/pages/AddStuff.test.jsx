import { Meteor } from 'meteor/meteor';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import AddStuff from './AddStuff';

configure({ adapter: new Adapter() });

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('AddStuff', function testSuite() {
    it('should render', function test1() {
      const wrapper = mount(<AddStuff />);
      // console.log(wrapper.html());
      expect(wrapper.find('input')).to.have.lengthOf(3); // name, quantity, submit
      expect(wrapper.find('select')).to.have.lengthOf(1);
      expect(wrapper.find('option')).to.have.lengthOf(4); // 'excellent', 'good', 'fair', 'poor'
    });
  });
}
