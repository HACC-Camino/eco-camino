import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { Events } from '../../api/event/EventCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';
import { UserEvents } from '../../api/user/UserEventCollection';
import { Notifications } from '../../api/notification/NotificationCollection';

/* eslint-disable no-console */
const maxFakers = {
  forumPosts: 10,
  events: 0,
  reports: 0,
};

const today = new Date();

const users = Meteor.users.find({}).fetch();
const userEmails = users.map(user => user.username);

if (Users.count() === 0) {
   users.forEach(user => {
     const userInfo = {};
     userInfo.dateJoined = faker.date.recent();
     userInfo.photoAWSKey = 'default-photo.png';
     userInfo.firstName = faker.name.firstName();
     userInfo.lastName = faker.name.lastName();
     userInfo.bio = faker.lorem.paragraph(faker.datatype.number({ min: 1, max: 5 })) || '';
     userInfo.zipCode = faker.address.zipCodeByState('hi').substring(0, 5);
     userInfo.owner = user.username;
     Users.define(userInfo);
   });
   console.log(`UserCollection: ${Users.count()}`);
}

if (ForumPosts.count() === 0) {
  // for faker sample forums
  for (let iter = 0; iter < maxFakers.forumPosts; iter++) {
    const post = {};
    post.date = faker.date.recent();
    post.type = 'main_post';
    post.title = faker.lorem.sentence().replace(/\.$/, '');
    post.content = faker.lorem.paragraph(faker.datatype.number({ min: 1, max: 10 })) || '';
    post.tags = faker.lorem.words(faker.datatype.number({ max: 5 })).split(' ');
    post.owner = faker.random.arrayElement(userEmails);
    ForumPosts.define(post);
  }

  // for faker replies on forums
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
      reply.owner = faker.random.arrayElement(userEmails);
      if (mainPost.owner !== reply.owner) {
        // notify owner about reply
        const message = `Someone replied to your post: ${mainPost.title}! Click here to see what they said.`;
        Notifications.define({
          dateCreated: reply.date,
          message: message,
          collectionType: 'forum',
          seen: false,
          forumID: mainPost._id,
          owner: mainPost.owner,
        });

        // get mainpost owner obj, give 2
        const mainPostOwner = Users.getUserDetails(mainPost.owner);
        Users.update(mainPostOwner._id, { points: mainPostOwner.points + 2 });
        // get replier owner obj, give .5
        const currentUser = Users.getUserDetails(reply.owner);
        Users.update(currentUser._id, { points: currentUser.points + 0.5 });
      }
      ForumPosts.define(reply);
    }
  });
  console.log(`ForumPostCollection with replies: ${ForumPosts.count()}`);
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvent.forEach(data => {
      Events.define(data);
      const owner = Users.getUserDetails(data.owner);
      Users.update(owner._id, { points: owner.points + 100 });
    });
    console.log(`EventCollection: ${Events.count()}`);
  }
}

if (UserEvents.count() === 0) {
  const events = Events.getEvenList();
  events.forEach(event => {
    const numParticipants = faker.datatype.number({ min: 1, max: userEmails.length });
    const temp = [...userEmails];
    for (let iter = 0; iter < numParticipants; iter++) {
      const email = faker.random.arrayElement(temp);
      if (event.owner !== email) {
        const userEvent = {};
        userEvent.dateJoined = faker.date.between(event.date, today);
        userEvent.owner = email;
        userEvent.eventID = event._id;
        UserEvents.define(userEvent);
        const current_date = new Date().getTime();
        const userEventOwner = Users.getUserDetails(userEvent.owner);
        const usedCodes = [...userEventOwner.usedCodes];
        if (new Date(event.date).getTime() < current_date) {
          usedCodes.push(event._id);
          Users.update(userEventOwner._id, { points: userEventOwner.points + 20, usedCodes });
        }
      }
      temp.splice(temp.includes(email), 1);
    }
    Events.update(event._id, { participants: event.participants + numParticipants });
  });
  console.log(`UserEventCollection: ${UserEvents.count()}`);
}

// notification for post owners: if someone replies
console.log(`NotificationCollection: ${Notifications.count()}`);

// notification for other people who replied:

// notification for event owners, if someone join
