import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { ForumPosts } from '../../api/forum/ForumPostCollection';

const collections = [
  ForumPosts,
];

collections.forEach(collection => collection.publish());

// DELETE THESE LATER
/** Publish all the collections you need. */
Stuffs.publish();

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
