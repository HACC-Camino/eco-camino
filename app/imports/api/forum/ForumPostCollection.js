import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { Notifications } from '../notification/NotificationCollection';

export const forumPostTypes = ['main_post', 'reply'];
export const forumPostPublications = {
  forumPost: 'ForumPost',
  forumPostCommunity: 'ForumPostCommunity',
};

class ForumPostCollection extends BaseCollection {
  constructor() {
    super('ForumPosts', new SimpleSchema({
      date: Date,
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

  define({ date, type, mainThread, title, content, tags, owner, mainPost }) {
    const docID = this._collection.insert({
      date,
      type,
      mainThread,
      title,
      content,
      tags,
      owner,
    });
    if (type === 'reply') {
      const message = `Someone replied to your post: ${mainPost.title}!`;
      Notifications.define({
        dateCreated: date,
        message: message,
        collectionType: 'forum',
        seen: false,
        forumID: mainPost._id,
        owner: mainPost.owner,
      });
    }
    return docID;
  }

  update(docID, { title, content, tags }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (content) {
      updateData.content = content;
    }
    if (tags) {
      updateData.tags = tags;
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

  getForumPostsSortedByDate() {
    return this._collection.find({ }, { sort: { date: -1 } }).fetch();
  }

  getForumPost(postID) {
    return this._collection.find({ _id: postID }).fetch()[0];
  }

  getForumPostReplies(postID) {
    return this._collection.find({ mainThread: postID }, { sort: { date: -1 } }).fetch();
  }

  getSubscriberEmailList(postID) {
    const post = this.getForumPost(postID);
    const replies = this.getForumPostReplies(postID);
    const emailList = [];
    replies.forEach(reply => {
      if (!emailList.includes(reply.owner) && reply.owner !== post.owner) {
        emailList.push(reply.owner);
      }
    });
    return emailList;
  }
}

export const ForumPosts = new ForumPostCollection();
