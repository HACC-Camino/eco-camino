import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Notifications } from './NotificationCollection';

export const notificationDefineMethod = new ValidatedMethod({
  name: 'NotificationsCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = Notifications.define(definitionData);
      console.log(docID);
      return docID;
    }
    return '';
  },
});

export const notificationUpdateMethod = new ValidatedMethod({
  name: 'NotificationsCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Notifications.update(updateData._id, updateData);
    return true;
  },
});

export const notificationRemoveItMethod = new ValidatedMethod({
  name: 'NotificationsCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Notifications.removeIt(instance);
  },
});
