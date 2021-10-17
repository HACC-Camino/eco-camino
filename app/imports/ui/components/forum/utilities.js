export const getLatestReply = (mainPost, replies) => {
  const numReplies = replies.length;
  return numReplies > 0 ? replies[0] : mainPost;
};

export const getReplies = (array, postID) => {
  const result = array.filter(forumPost => forumPost.mainThread === postID);
  return result;
};
