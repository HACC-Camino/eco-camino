import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

export const userPublications = {
  user: 'User',
  userCommunity: 'UserCommunity',
};

class UserCollection extends BaseCollection {
  constructor() {
    super('User', new SimpleSchema({
      dateJoined: Date,
      photoAWSKey: {
        type: String,
        optional: true,
      },
      firstName: String,
      lastName: String,
      bio: String,
      zipCode: Number,
      points: {
        type: Number,
        defaultValue: 0,
        optional: true,
      },
      owner: String,
    }));
  }

  define({ dateJoined, photoAWSKey, firstName, lastName, bio, zipCode, owner }) {
    const docID = this._collection.insert({
      dateJoined,
      photoAWSKey,
      firstName,
      lastName,
      bio,
      zipCode,
      owner,
    });
    return docID;
  }

  update(docID, { photoAWSKey, firstName, lastName, bio, zipCode }) {
    const updateData = {};
    if (photoAWSKey) {
      updateData.photoAWSKey = photoAWSKey;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (bio) {
      updateData.bio = bio;
    }
    if (_.isNumber(zipCode)) {
      updateData.zipCode = zipCode;
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
      Meteor.publish(userPublications.user, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(userPublications.userCommunity, function publish() {
        return instance._collection.find();
      });
    }
  }

  subscribeUser() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.user);
    }
    return null;
  }

  subscribeUserCommunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userCommunity);
    }
    return null;
  }

  getUserDetails(username) {
    return this._collection.findOne({ owner: username });
  }
}

export const Users = new UserCollection();
