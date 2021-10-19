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
    history.push(pageLink);
  };

  return (
    <tr className="d-flex" onClick={goToPage} style={{ cursor: 'pointer' }}>
      <td className="col-7">{mainPost.title}</td>
      <td className="col-1">{numReplies}</td>
      <td className="col-2" >
        <p className="text-muted overflow-hidden">{mainPost.date.toLocaleDateString()}
          <br/>
          {mainPost.owner}
        </p>
      </td>
      <td className="col-2">
        <p className="text-muted overflow-hidden text-">{latestReply.date.toLocaleDateString()}
          <br/>
          {latestReply.owner}
        </p>
      </td>
    </tr>
  );
};

ForumPostRow.propTypes = {
  propsObject: PropTypes.object.isRequired,
};

export default ForumPostRow;
