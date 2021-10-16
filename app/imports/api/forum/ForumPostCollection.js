import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const forumPostTypes = ['main_post', 'reply'];
export const forumPostPublications = {
  forumPost: 'ForumPost',
  forumPostCommunity: 'ForumPostCommunity',
};

class ForumPostCollection extends BaseCollection {
  constructor() {
    super('ForumPost', new SimpleSchema({
      date: String,
      type: {
        type: String,
        allowedValues: forumPostTypes,
        defaultValue: 'main_post',
      },
      mainThread: { // id of mainThread
        type: String,
        optional: true,
      },
      title: String,
      content: String,
      tags: {
        type: Array,
        optional: true,
        defaultValue: [],
      },
      'tags.$': { type: String },
      owner: String,
    }));
  }

  define({ date, type, mainThread, title, content, tags, owner }) {
    const docID = this._collection.insert({
      date,
      type,
      mainThread,
      title,
      content,
      tags,
      owner,
    });
    return docID;
  }

  update(docID, { mainThread, title, content, tags }) {
    const updateData = {};
    if (mainThread) {
      updateData.mainThread = mainThread;
    }
    if (title) {
      updateData.title = title;
    }
    if (content) {
      updateData.content = content;
    }
    if (tags) {
      updateData.tags = tags;
    }
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
      Meteor.publish(forumPostPublications.forumPost, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(forumPostPublications.forumPostCommunity, function publish() {
        return instance._collection.find();
      });
    }
  }

  subscribeForumPost() {
    if (Meteor.isClient) {
      return Meteor.subscribe(forumPostPublications.forumPost);
    }
    return null;
  }

  subscribeForumPostCommunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(forumPostPublications.forumPostCommunity);
    }
    return null;
  }

  getForumPostsSortedByDate(username) {
    return this._collection.find({ owner: username }, { sort: { date: -1 } }).fetch();
  }
}

export const ForumPosts = new ForumPostCollection();
