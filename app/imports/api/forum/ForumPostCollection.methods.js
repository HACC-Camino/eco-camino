import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ForumPosts } from './ForumPostCollection';

export const forumPostDefineMethod = new ValidatedMethod({
  name: 'ForumPostsCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = ForumPosts.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const forumPostUpdateMethod = new ValidatedMethod({
  name: 'ForumPostsCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    ForumPosts.update(updateData._id, updateData);
    return true;
  },
});

export const forumPostRemoveItMethod = new ValidatedMethod({
  name: 'ForumPostsCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return ForumPosts.removeIt(instance);
  },
});
