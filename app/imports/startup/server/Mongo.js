import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection.js';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';

/* eslint-disable no-console */

if (ForumPosts.count() === 0) {
  if (Meteor.settings.defaultForumPosts) {
    Meteor.settings.defaultForumPosts.map(forumPosts => ForumPosts.define(forumPosts));
    console.log(`ForumPostCollection: ${ForumPosts.count()}`);
  }
}

if (Users.count() === 0) {
  if (Meteor.settings.defaultUsers) {
    Meteor.settings.defaultUsers.map(forumPosts => Users.define(forumPosts));
    console.log(`UserCollection: ${Users.count()}`);
  }
}

console.log(Users.getUserDetails('john@foo.com'));
// DELETE THESE LATER
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
