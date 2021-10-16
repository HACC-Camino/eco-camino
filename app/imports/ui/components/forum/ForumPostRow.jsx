import React from 'react';
import PropTypes from 'prop-types';

const ForumPostRow = ({ mainPost, replies }) => {
  const numReplies = replies.length;
  const latestReply = numReplies > 0 ? replies[0] : mainPost;

  return (
    <tr>
      <td>{mainPost.title}</td>
      <td>{numReplies}</td>
      <td>
        {`${mainPost.date.toLocaleDateString()}\n ${mainPost.owner}`}
      </td>
      <td>
        {`${latestReply.date.toLocaleDateString()}\n ${latestReply.owner}`}
      </td>
    </tr>
  );
};

ForumPostRow.propTypes = {
  mainPost: PropTypes.object,
  replies: PropTypes.array,
};

export default ForumPostRow;
