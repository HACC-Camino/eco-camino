import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ForumPosts } from './ForumPostCollection';

export const forumPostDefineMethod = new ValidatedMethod({
  name: 'ForumPostCollection.define',
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
  name: 'ForumPostCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    ForumPosts.update(updateData.id, updateData);
    return true;
  },
});

export const forumPostRemoveItMethod = new ValidatedMethod({
  name: 'ForumPostCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return ForumPosts.removeIt(instance);
  },
});