import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import ProfilePreviewModal from '../profile/ProfilePreviewModal';

const getCardBodyContent = (replyOwner) => (
  <tr key={replyOwner.reply._id} className="border-bottom">
    <td width="75%"><br/>{replyOwner.reply.content}<br/><br/></td>
    <td width="25%">
      <br/>
      Posted By: <ProfilePreviewModal userDetail={replyOwner.owner}/>
      <br/>
      Date: {replyOwner.reply.date.toLocaleString()}
    </td>
  </tr>);

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
        <Table borderless className="fixed">
          <tbody>
          {replyOwners.map(replyOwner => getCardBodyContent(replyOwner))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

ForumRepliesCard.propTypes = {
  replies: PropTypes.array,
  users: PropTypes.array,
};

export default ForumRepliesCard;
