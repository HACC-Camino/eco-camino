import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const userEventPublications = {
  userEvent: 'UserEvent',
  userEventCommunity: 'UserEventCommunity',
};

class UserEventCollection extends BaseCollection {
  constructor() {
    super('UserEvent', new SimpleSchema({
      dateJoined: Date,
      owner: String,
      eventID: String,
      isOwner: Boolean,
    }));
  }

  define({ dateJoined, owner, eventID, isOwner }) {
    const docID = this._collection.insert({
      dateJoined,
      owner,
      eventID,
      isOwner,
    });
    return docID;
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
      Meteor.publish(userEventPublications.userEvent, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(userEventPublications.userEventCommunity, function publish() {
        return instance._collection.find();
      });
    }
  }

  subscribeUserEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userEventPublications.userEvent);
    }
    return null;
  }

  subscribeUserEventCommunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userEventPublications.userEventCommunity);
    }
    return null;
  }

  getUserEventDetails(username) {
    return this._collection.findOne({ owner: username });
  }
}

export const UserEvents = new UserEventCollection();
