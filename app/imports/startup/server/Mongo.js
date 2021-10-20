import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { Events } from '../../api/event/EventCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';
import { UserEvents } from '../../api/user/UserEventCollection';
import { Reports } from '../../api/report/ReportCollection';

/* eslint-disable no-console */

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
  if (Meteor.settings.defaultForums) {
    Meteor.settings.defaultForums.forEach(post => {
      ForumPosts.define({
        date: '10/20/2021',
        type: 'main_post',
        title: post.title,
        content: post.content,
        tags: post.tags.split(', '),
        owner: faker.random.arrayElement(userEmails),
      });
    });

    if (Meteor.settings.defaultForumReplies) {
      const mainPosts = ForumPosts.getForumPostsSortedByDate();
      Meteor.settings.defaultForumReplies.forEach(postArray => {
        const mainPost = mainPosts.find(post => post.title === postArray.title);
        postArray.replies.forEach(reply => {
          const owner = faker.random.arrayElement(userEmails);
          ForumPosts.define({
            date: faker.date.between(mainPost.date, today),
            type: 'reply',
            mainThread: mainPost._id,
            title: `Re: ${mainPost.title}`,
            content: reply,
            owner: owner,
            mainPost: mainPost,
          });
          if (mainPost.owner !== owner) {
            // get mainpost owner obj, give 2
            const mainPostOwner = Users.getUserDetails(mainPost.owner);
            Users.update(mainPostOwner._id, { points: mainPostOwner.points + 2 });
            // get replier owner obj, give .5
            const currentUser = Users.getUserDetails(reply.owner);
            Users.update(currentUser._id, { points: currentUser.points + 0.5 });
          }
        });
      });
    }
  }
  console.log(`ForumPostCollection: ${ForumPosts.count()}`);
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvent.forEach(data => {
      const userEmail = faker.random.arrayElement(userEmails);
      const userObj = Users.getUserDetails(userEmail);
      Events.define({
        title: data.title,
        date: faker.date.between(new Date(2021, 9, 1), today),
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        owner: userEmail,
        participants: 1,
        lat: data.lat,
        lng: data.lng,
        name: `${userObj.firstName} ${userObj.lastName}`,
        email: userEmail,
        description: data.description,
        typeOfEvent: data.typeOfEvent,
        status: 'pending',
        feedback: 'none',
      });
      Users.update(userObj._id, { points: userObj.points + 100 });
    });
    const events = Events.getEvenList();
    events.map(event => Events.update(event._id, { status: 'approved', eventOwner: event.owner }));
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
      if (event.owner !== email && event.status === 'approved') {
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

if (Reports.count() === 0) {
  if (Meteor.settings.defaultReports) {
    Meteor.settings.defaultReports.forEach(report => {
      Reports.define({
        title: report.title,
        date: faker.date.recent(),
        location: report.location,
        owner: faker.random.arrayElement(userEmails),
        lat: report.lat,
        lng: report.lng,
        description: report.description,
        accessKey: report.accessKey,
      });
    });
  }
  console.log(`ReportsCollection: ${Reports.count()}`);
}
