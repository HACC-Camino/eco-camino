import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';
import { UserEvents } from '../../api/user/UserEventCollection';
import { Reports } from '../../api/report/ReportCollection';
import { Notifications } from '../../api/notification/NotificationCollection';

const collections = [
  ForumPosts,
  Users,
  Events,
  UserEvents,
  Reports,
  Notifications,
];

collections.forEach(collection => collection.publish());

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
