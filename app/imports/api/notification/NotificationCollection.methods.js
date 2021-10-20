import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Notifications } from './NotificationCollection';

export const notificationDefineMethod = new ValidatedMethod({
  name: 'NotificationCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = Notifications.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const notificationUpdateMethod = new ValidatedMethod({
  name: 'NotificationCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Notifications.update(updateData._id, updateData);
    return true;
  },
});

export const notificationRemoveItMethod = new ValidatedMethod({
  name: 'NotificationCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Notifications.removeIt(instance);
  },
});
