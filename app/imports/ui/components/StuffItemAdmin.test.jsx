import { Meteor } from 'meteor/meteor';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import faker from 'faker';
import StuffItemAdmin from './StuffItemAdmin';
import { stuffConditions } from '../../api/stuff/StuffCollection';

configure({ adapter: new Adapter() });

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('StuffItemAdmin', function testSuite() {
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
      // We get a warning if the StuffItemAdmin isn't in a table and tbody or thead.
      const wrapper = mount(<table><tbody><StuffItemAdmin stuff={item} /></tbody></table>);
      expect(wrapper.find('td')).to.have.lengthOf(4);
      expect(wrapper.find('td').at(0).text()).to.equal(name); // name Table.Cell
      expect(wrapper.find('td').at(1).text()).to.equal(`${quantity}`); // quantity Table.Cell
      expect(wrapper.find('td').at(2).text()).to.equal(condition); // condition Table.Cell
      expect(wrapper.find('td').at(3).text()).to.equal(owner); // edit Table.Cell
    });
  });
}
