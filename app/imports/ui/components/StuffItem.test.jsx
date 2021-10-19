import { Meteor } from 'meteor/meteor';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import faker from 'faker';
import StuffItem from './StuffItem';
import { stuffConditions } from '../../api/stuff/StuffCollection';

configure({ adapter: new Adapter() });

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('StuffItem', function testSuite() {
    it('should render', function test1() {
      const _id = faker.lorem.word();
      const name = faker.lorem.words();
      const quantity = faker.random.number({
        min: 1,
        max: 10,
      });
      const owner = faker.lorem.words();
      const condition = stuffConditions[faker.random.number({ min: 1, max: stuffConditions.length - 1 })];
      const item = { _id, name, quantity, owner, condition };
      // Since StuffItem uses withRouter we need to wrap it in a <Router>
      // Also get a warning if the StuffItem isn't in a table and tbody or thead.
      const wrapper = mount(<Router><table><tbody><StuffItem stuff={item} /></tbody></table></Router>);
      expect(wrapper.find('td')).to.have.lengthOf(4);
      expect(wrapper.find('td').at(0).text()).to.equal(name); // name Table.Cell
      expect(wrapper.find('td').at(1).text()).to.equal(`${quantity}`); // quantity Table.Cell
      expect(wrapper.find('td').at(2).text()).to.equal(condition); // condition Table.Cell
      expect(wrapper.find('td').at(3).find('a').prop('href')).to.equal(`#/edit/${_id}`); // edit Table.Cell
    });
  });
}
