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
    }));
  }

  define({ dateJoined, owner, eventID }) {
    const docID = this._collection.insert({
      dateJoined,
      owner,
      eventID,
    });
    return docID;
  }

  removeIt(eventIDT) {
    const doc = this._collection.find({ eventID: eventIDT.eventIDT }).fetch();
    check(doc[0], Object);
    this._collection.remove(doc[0]._id);
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

  getUserEvent(username) {
    return this._collection.find({}, { owner: username }).fetch();
  }

  getUserInEvent(event, username) {
    const userEvents = this._collection.find({}, { owner: username }).fetch();
    console.log(userEvents);
    console.log(event);

  }
}

export const UserEvents = new UserEventCollection();
