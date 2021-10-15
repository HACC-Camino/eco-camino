import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Stuffs } from './StuffCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const stuffDefineMethod = new ValidatedMethod({
  name: 'StuffCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('stuffDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = Stuffs.define(definitionData);
      // console.log(`stuffDefineMethod returning ${docID}. Now have ${Stuffs.count()}`);
      return docID;
    }
    return '';
  },
});

export const stuffUpdateMethod = new ValidatedMethod({
  name: 'StuffCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Stuffs.update(updateData.id, updateData);
    return true;
  },
});

export const stuffRemoveItMethod = new ValidatedMethod({
  name: 'StuffCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Stuffs.removeIt(instance);
  },
});
