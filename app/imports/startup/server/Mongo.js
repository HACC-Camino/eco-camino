import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { Stuffs } from '../../api/stuff/StuffCollection.js';
import { Events } from '../../api/event/EventCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';

/* eslint-disable no-console */

const today = new Date();

if (ForumPosts.count() === 0) {
  if (Meteor.settings.defaultForumPosts) {
    Meteor.settings.defaultForumPosts.map(forumPosts => ForumPosts.define(forumPosts));
    console.log(`ForumPostCollection: ${ForumPosts.count()}`);

    const mainPosts = ForumPosts.getForumPostsSortedByDate();

    mainPosts.forEach(mainPost => {
      const numReplies = faker.datatype.number({ max: 5 });
      for (let iter = 0; iter < numReplies; iter++) {
        const reply = {};
        reply.date = faker.date.between(mainPost.date, today);
        reply.type = 'reply';
        reply.mainThread = mainPost._id;
        reply.title = mainPost.title;
        reply.content = faker.lorem.paragraph(faker.datatype.number({ max: 5 }));
        reply.owner = 'john@foo.com';
        ForumPosts.define(reply);
      }
    });
    console.log(`ForumPostCollection with replies: ${ForumPosts.count()}`);
  }
}

if (Users.count() === 0) {
  if (Meteor.settings.defaultUsers) {
    Meteor.settings.defaultUsers.map(forumPosts => Users.define(forumPosts));
    console.log(`UserCollection: ${Users.count()}`);
  }
}

/** Initialize the collection if empty. */
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvent.map(data => Events.define(data));
  }
}

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
