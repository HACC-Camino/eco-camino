import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';
import { Notifications } from '../notification/NotificationCollection';
import { UserEvents } from '../user/UserEventCollection';

export const eventPublications = {
  event: 'Event',
  eventAdmin: 'EventAdmin',
};

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      title: String,
      date: Date,
      location: String,
      owner: String,
      name: String,
      email: String,
      description: String,
      startTime: String,
      endTime: String,
      participants: Number,
      lat: Number,
      lng: Number,
      status: String,
      feedback: String,
      typeOfEvent: {
        type: String,
      },
    }));
  }

  /**
   * Defines a new Event item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ title, date, name, location, owner, lat, lng, email, participants,
           description, startTime, endTime, typeOfEvent, status, feedback }) {
    const docID = this._collection.insert({
      title,
      date,
      location,
      owner,
      lat,
      lng,
      name,
      email,
      description,
      typeOfEvent,
      status,
      feedback,
      startTime,
      endTime,
      participants,
    });
    const message = 'An event has been created and is waiting for review.';
    Notifications.define({
      dateCreated: new Date(),
      message: message,
      collectionType: 'event',
      seen: false,
      owner: 'admin@foo',
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { title, date, name, location, owner, lat, lng, email,
    description, startTime, endTime, typeOfEvent, reportLink, participants, status, feedback, eventOwner }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (date) {
      updateData.date = date;
    }
    if (name) {
      updateData.name = name;
    }
    if (location) {
      updateData.location = location;
    }
    if (owner) {
      updateData.owner = owner;
    }
    if (email) {
      updateData.email = email;
    }
    if (description) {
      updateData.description = description;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    if (typeOfEvent) {
      updateData.typeOfEvent = typeOfEvent;
    }
    if (reportLink) {
      updateData.reportLink = reportLink;
    }
    if (status) {
      updateData.status = status;
    }
    if (feedback) {
      updateData.feedback = feedback;
    }
    if (_.isNumber(participants)) {
      updateData.participants = participants;
    }
    if (_.isNumber(lat)) {
      updateData.lat = lat;
    }
    if (_.isNumber(lng)) {
      updateData.lng = lng;
    }
    if (eventOwner && eventOwner === owner) {
      const message = `Your event, ${title}, has been updated!`;
      Notifications.define({
        dateCreated: new Date(),
        message: message,
        collectionType: 'event',
        seen: false,
        owner: eventOwner,
      });
    }
    UserEvents.getParticipants(docID).forEach(user => {
      const message = 'An event you\'re participating in has been updated!';
      Notifications.define({
        dateCreated: new Date(),
        message: message,
        collectionType: 'event',
        seen: false,
        owner: user,
      });
    });
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the Event associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the EventCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(eventPublications.event, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(eventPublications.eventAdmin, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for event owned by the current user.
   */
  subscribeEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.event);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEventAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventAdmin);
    }
    return null;
  }

  // Gets all the approved events after the current date
  getCurrentEvents() {
    const todayDate = new Date();
    const allEvents = this._collection.find({ status: 'approved' }, { sort: { date: 1 } }).fetch();
    return allEvents.filter(event => event.date > todayDate);
  }

  // Gets all the events after the current date
  getAllEvents() {
    const todayDate = new Date();
    const allEvents = this._collection.find({}, { sort: { date: 1 } }).fetch();
    return allEvents.filter(event => event.date > todayDate);
  }

  // Gets all the pending events after the current date
  getAllPendingEvents() {
    const todayDate = new Date();
    const allEvents = this._collection.find({ status: 'pending' }, { sort: { date: 1 } }).fetch();
    return allEvents.filter(event => event.date > todayDate);
  }

  // Gets all the events that are cleanups
  getCurrentCleanups() {
    const currentEvents = this.getCurrentEvents();
    return currentEvents.filter(event => event.typeOfEvent === 'Cleanup');
  }

  // Gets all the events that are workshops
  getCurrentWorkshops() {
    const currentEvents = this.getCurrentEvents();
    return currentEvents.filter(event => event.typeOfEvent === 'Workshop');
  }

  // Gets all the events that are owned by a specific user
  getCurrentOwnedWorkshops(username) {
    const currentEvents = this.getAllEvents();
    return currentEvents.filter(event => event.owner === username);
  }

  getEvenList() {
    return this._collection.find({}, { sort: { date: 1 } }).fetch();
  }

  getUserEventList(username) {
    return this._collection.find({ owner: username }).fetch();
  }

  // returns all event id's.
  getEventIdList() {
    return this._collection.find({}).fetch().map(event => event._id);
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
