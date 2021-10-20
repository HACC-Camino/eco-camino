import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const notificationPublication = {
  notification: 'Notification',
};

export const collectionTypes = ['event', 'forum', 'report'];

class NotificationCollection extends BaseCollection {
  constructor() {
    super('Notification', new SimpleSchema({
      dateCreated: Date,
      message: String,
      collectionType: {
        type: String,
        allowedValues: collectionTypes,
      },
      seen: {
        type: Boolean,
        defaultValue: false,
      },
      forumID: {
        type: String,
        optional: true,
      },
      owner: String,
    }));
  }

  define({ dateCreated, message, collectionType, seen, forumID }) {
    const docID = this._collection.insert({
      dateCreated,
      message,
      collectionType,
      seen,
      forumID,
    });
    return docID;
  }

  update(docID, { seen }) {
    const updateData = {};
    if (typeof (seen) === 'boolean') {
      updateData.seen = seen;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;

      Meteor.publish(notificationPublication.notification, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeNotification() {
    if (Meteor.isClient) {
      return Meteor.subscribe(notificationPublication.notification);
    }
    return null;
  }

  getAllNotification() {
    return this._collection.find({}, { sort: { dateCreated: 1 } }).fetch();
  }
}

export const Notifications = new NotificationCollection();
