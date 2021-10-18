import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/all';
import ProfilePreviewModal from '../profile/ProfilePreviewModal';
import CustomPagination from '../CustomPagination';
import DeleteReplyModal from './DeleteReplyModal';

const getCardBodyContent = (replyOwner, currentUser) => (
  <tr key={replyOwner.reply._id} className="border-bottom">
    <td width="80%">
      <br/>
      {replyOwner.reply.content}
      <br/>
      <br/>
    </td>
    <td width="20%">
      <br/>
      Posted By: <ProfilePreviewModal userDetail={replyOwner.owner}/>
      <br/>
      Date: {replyOwner.reply.date.toLocaleString()}
      <br/>
      <BsPencilSquare style={{ cursor: 'pointer', color: '#78c2ad' }}/>
      <DeleteReplyModal replyID={replyOwner.reply._id} show={replyOwner.owner.owner === currentUser}/>
      <br/>
    </td>
  </tr>);

const ForumRepliesCard = ({ replies, users, currentUser }) => {
  const [rows, setRows] = useState([]);
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };

  const maxRow = 10;
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
          {rows.map(replyOwner => getCardBodyContent(replyOwner, currentUser))}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>
        <CustomPagination
          arrayObjects={replyOwners}
          maxRows={maxRow}
          parentCallback={handlePageCallback}
        />
      </Card.Footer>
    </Card>
  );
};

ForumRepliesCard.propTypes = {
  replies: PropTypes.array,
  users: PropTypes.array,
  currentUser: PropTypes.string,
};

export default ForumRepliesCard;
