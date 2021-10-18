import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ForumPostRow = ({ propsObject }) => {
  const mainPost = propsObject.mainPost;
  const numReplies = propsObject.replies.length;
  const latestReply = propsObject.latestReply;

  const history = useHistory();
  const goToPage = () => {
    const pageLink = `post/${mainPost._id}`;
    //window.location.reload();
    history.push(pageLink);
  };

  return (
    <tr onClick={goToPage} style={{ cursor: 'pointer' }}>
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
  propsObject: PropTypes.object.isRequired,
};

export default ForumPostRow;
