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

  removeIt(_id) {
    const doc = this.findDoc(_id);
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
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
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

  // Get the events that a specific user joined
  getUserEvent(username) {
    return this._collection.find({}, { owner: username }).fetch();
  }

  // Gets the events of all users that joined any event
  getAllUserEvent() {
    return this._collection.find().fetch();
  }

  // Gets the EVENTS from a specific user (UserEvent --> Event)
  getUserJoinedEvent(EventCollection, username) {
    const userEvents = this.getUserEvent(username);
    const userEventID = userEvents.map(event => event.eventID);
    return EventCollection.filter(event => userEventID.includes(event._id));
  }
}

export const UserEvents = new UserEventCollection();
