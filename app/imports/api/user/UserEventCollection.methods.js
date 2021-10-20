import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserEvents } from './UserEventCollection';

export const userEventDefineMethod = new ValidatedMethod({
  name: 'UsersEventCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = UserEvents.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const userEventRemoveItMethod = new ValidatedMethod({
  name: 'UsersEventCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return UserEvents.removeIt(instance);
  },
});
