import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { Events } from '../../api/event/EventCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';

/* eslint-disable no-console */
const maxFakers = {
  forumPosts: 10,
};

const today = new Date();

if (Users.count() === 0) {
  if (Meteor.settings.defaultUsers) {
    Meteor.settings.defaultUsers.map(forumPosts => Users.define(forumPosts));
    console.log(`UserCollection: ${Users.count()}`);
  }
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvent.map(data => Events.define(data));
  }
}

if (ForumPosts.count() === 0) {
  if (Meteor.settings.defaultForumPosts) {
    // for more realistic sample forums, add them on 'settings.development.json'
    Meteor.settings.defaultForumPosts.map(forumPosts => ForumPosts.define(forumPosts));
    console.log(`ForumPostCollection: ${ForumPosts.count()}`);

    // for fake sample forums
    for (let iter = 0; iter < maxFakers.forumPosts; iter++) {
      const post = {};
      post.date = faker.date.recent();
      post.type = 'main_post';
      post.title = faker.lorem.sentence().replace(/\.$/, '');
      post.content = faker.lorem.paragraph(faker.datatype.number({ min: 1, max: 10 })) || '';
      post.tags = faker.lorem.words(faker.datatype.number({ max: 5 })).split(' ');
      post.owner = faker.random.arrayElement(['admin@foo.com', 'john@foo.com']);
      ForumPosts.define(post);
    }

    // for fake replies on forums
    const mainPosts = ForumPosts.getForumPostsSortedByDate();
    console.log(`ForumPostCollection: ${ForumPosts.count()}`);

    mainPosts.forEach(mainPost => {
      const numReplies = faker.datatype.number({ max: 5 });
      for (let iter = 0; iter < numReplies; iter++) {
        const reply = {};
        reply.date = faker.date.between(mainPost.date, today);
        reply.type = 'reply';
        reply.mainThread = mainPost._id;
        reply.title = `Re: ${mainPost.title}`;
        reply.content = faker.lorem.paragraph(faker.datatype.number({ min: 1, max: 5 })) || '';
        reply.owner = faker.random.arrayElement(['admin@foo.com', 'john@foo.com']);
        ForumPosts.define(reply);
      }
    });
    console.log(`ForumPostCollection with replies: ${ForumPosts.count()}`);
  }
}
