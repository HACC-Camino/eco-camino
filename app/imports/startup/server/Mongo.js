import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection.js';
import { ForumPosts } from '../../api/forum/ForumPostCollection';

/* eslint-disable no-console */

if (ForumPosts.count() === 0) {
  if (Meteor.settings.defaultForumPosts) {
    Meteor.settings.defaultForumPosts.map(forumPosts => ForumPosts.define(forumPosts));
    console.log(`ForumPostCollection: ${ForumPosts.count()}`);
  }
}

console.log(ForumPosts.getForumPostsSortedByDate('john@foo.com'));

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

/** Initialize the collection if empty. */
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
