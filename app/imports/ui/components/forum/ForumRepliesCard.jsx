import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import ProfilePreviewModal from '../profile/ProfilePreviewModal';
import CustomPagination from '../CustomPagination';

const getCardBodyContent = (replyOwner) => (
  <tr key={replyOwner.reply._id} className="border-bottom">
    <td width="80%"><br/>{replyOwner.reply.content}<br/><br/></td>
    <td width="20%">
      <br/>
      Posted By: <ProfilePreviewModal userDetail={replyOwner.owner}/>
      <br/>
      Date: {replyOwner.reply.date.toLocaleString()}
      <br/><br/>
    </td>
  </tr>);

const ForumRepliesCard = ({ replies, users }) => {
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
          {rows.map(replyOwner => getCardBodyContent(replyOwner))}
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
};

export default ForumRepliesCard;
