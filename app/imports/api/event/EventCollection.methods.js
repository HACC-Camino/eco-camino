import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Events } from './EventCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const eventDefineMethod = new ValidatedMethod({
  name: 'EventsCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('stuffDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = Events.define(definitionData);
      // console.log(`stuffDefineMethod returning ${docID}. Now have ${Stuffs.count()}`);
      return docID;
    }
    return '';
  },
});

export const eventUpdateMethod = new ValidatedMethod({
  name: 'EventsCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Events.update(updateData._id, updateData);
    return true;
  },
});

export const eventRemoveItMethod = new ValidatedMethod({
  name: 'EventsCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Events.removeIt(instance);
  },
});
