import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';
import { Users } from '../../api/user/UserCollection';
import { UserEvents } from '../../api/user/UserEventCollection';

const collections = [
  ForumPosts,
  Users,
  Events,
  UserEvents,
];

collections.forEach(collection => collection.publish());

// // DELETE THESE LATER
// /** Publish all the collections you need. */
Stuffs.publish();
// Events.publish();

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
