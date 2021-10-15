import { Meteor } from 'meteor/meteor';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import AddStuff from './AddStuff';
import { defineTestUser, withLoggedInUser, withSubscriptions } from '../../test-utils/test-utilities';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';

configure({ adapter: new Adapter() });

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('AddStuff', function testSuite() {
    it('can submit stuff', async function test1() {
      // stub out the stuffDefineMethod
      sinon.stub(stuffDefineMethod, 'call');
      const { username, password } = await defineTestUser.callPromise();
      await withLoggedInUser({ username, password });
      await withSubscriptions();
      const wrapper = mount(<AddStuff />);
      // console.log(wrapper.html());
      wrapper.find('input[name="name"]').simulate('change', {
        target: { value: 'New Item' },
      });
      wrapper.find('input[name="quantity"]').simulate('change', {
        target: { value: 3 },
      });
      await wrapper.find('input[type="submit"]').simulate('submit');

      // make sure the stuffDefineMethod was called once.
      sinon.assert.calledOnce(stuffDefineMethod.call);
      // check the stub was called with the right parameters.
      sinon.assert.calledWith(stuffDefineMethod.call, {
        name: 'New Item',
        quantity: 3,
        condition: 'good',
        owner: username,
      });
    });
  });
}
