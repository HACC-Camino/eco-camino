import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, Table } from 'react-bootstrap';
import ProfilePreviewModal from '../profile/ProfilePreviewModal';

const ForumMainPostCard = ({ mainPost, owner }) => (
    <Card>
      <Card.Header as='h4'>{mainPost.title}</Card.Header>
      <Card.Body>
        <Table borderless className="fixed">
          <tbody>
          <tr>
            <td width="75%">{mainPost.content}</td>
            <td width="25%">
              Posted By: <ProfilePreviewModal userDetail={owner}/>
              <br/>
              Date: {mainPost.date.toLocaleString()}
              <br/>
              Tags: {mainPost.tags.map(tag => <Badge
              className="mx-1 bg-light text-primary"
              key={tag}
              pill>{tag}</Badge>)}
            </td>
          </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

ForumMainPostCard.propTypes = {
  mainPost: PropTypes.object,
  owner: PropTypes.object,
};

export default ForumMainPostCard;
