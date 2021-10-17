import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import ProfilePreviewModal from '../profile/ProfilePreviewModal';

const getCardBodyContent = (replyOwner) => (
    <Table borderless className="fixed">
      <tbody>
        <tr>
          <td width="75%">{replyOwner.reply.content}</td>
          <td width="25%">
            Posted By: <ProfilePreviewModal userDetai={replyOwner.owner}/>
            <br/>
            Date: {replyOwner.reply.date.toLocaleString()}
          </td>
        </tr>
      </tbody>
    </Table>);

const ForumRepliesCard = ({ replies, users }) => {
  const replyOwners = [];
  replies.forEach(reply => {
      const owner = users.find(user => user.owner === reply.owner);
      replyOwners.push({ reply, owner });
    });

  return (
    <Card>
      <Card.Header as='h4'>Replies</Card.Header>
      <Card.Body>
        {replyOwners.map(replyOwner => getCardBodyContent(replyOwner))}
      </Card.Body>
    </Card>
  );
};

ForumRepliesCard.propTypes = {
  replies: PropTypes.array,
  users: PropTypes.array,
};

export default ForumRepliesCard;
