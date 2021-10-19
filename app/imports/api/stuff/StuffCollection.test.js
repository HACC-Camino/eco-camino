import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Stuffs, stuffConditions } from './StuffCollection';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('StuffCollection', function testSuite() {
    before(function setup() {
      resetDatabase();
    });

    after(function teardown() {
      resetDatabase();
    });

    it('Can define and removeIt', function test1(done) {
      this.timeout(5000);
      fc.assert(
          fc.property(fc.lorem(2), fc.integer(1, 10), fc.lorem(1), fc.integer(0, stuffConditions.length - 1),
              (name, quantity, owner, choice) => {
            const condition = stuffConditions[choice];
            const docID = Stuffs.define({
              name,
              quantity,
              owner,
              condition,
            });
            expect(Stuffs.isDefined(docID)).to.be.true;
            Stuffs.removeIt(docID);
            expect(Stuffs.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

    it('Can update', function test2(done) {
      this.timeout(5000);
      const name = faker.lorem.words();
      const quantity = faker.random.number({
        min: 1,
        max: 10,
      });
      const owner = faker.lorem.words();
      const condition = stuffConditions[faker.random.number({ min: 1, max: stuffConditions.length - 1 })];
      const docID = Stuffs.define({
        name,
        quantity,
        owner,
        condition,
      });
      // console.log(Stuffs.findDoc(docID));
      fc.assert(
          fc.property(fc.lorem(2), fc.integer(10), fc.integer(0, stuffConditions.length - 1),
              (newName, newQuantity, index) => {
            Stuffs.update(docID, {
              name: newName,
              quantity: newQuantity,
              condition: stuffConditions[index],
            });
            const stuff = Stuffs.findDoc(docID);
            expect(stuff.name).to.equal(newName);
            expect(stuff.quantity).to.equal(newQuantity);
            expect(stuff.condition).to.equal(stuffConditions[index]);
              }),
      );
      done();
    });
  });
}
