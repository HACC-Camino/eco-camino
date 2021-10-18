import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const reportPublications = {
  report: 'Report',
  reportAdmin: 'ReportAdmin',
};

class ReportCollection extends BaseCollection {
  constructor() {
    super('Reports', new SimpleSchema({
      title: String,
      date: Date,
      location: String,
      owner: String,
      accessKey: String,
      description: String,
      lat: Number,
      lng: Number,
    }));
  }

  /**
   * Defines a new Report item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ title, date, location, owner, lat, lng,
           description, accessKey }) {
    const docID = this._collection.insert({
      title,
      date,
      location,
      owner,
      lat,
      lng,
      description,
      accessKey,
    });
    return docID;
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
   * It publishes the entire collection for admin and just the Report associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ReportCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(reportPublications.report, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(reportPublications.reportAdmin, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for report owned by the current user.
   */
  subscribeReport() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reportPublications.report);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeReportAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reportPublications.reportAdmin);
    }
    return null;
  }

  getReportList() {
    return this._collection.find().fetch();
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Reports = new ReportCollection();
