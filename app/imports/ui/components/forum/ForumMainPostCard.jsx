import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Col, Row, Table } from 'react-bootstrap';
import ProfilePreviewModal from '../profile/ProfilePreviewModal';
import DeleteForumPost from './DeleteForumPost';

const ForumMainPostCard = ({ mainPost, owner, currrentUser, repliesID }) => (
    <Card>
      <Card.Header as='h4'>
        <Row>
          <Col className="align-middle">
            {mainPost.title}
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Button variant="outline-primary" className="mx-1">Edit</Button>
            <DeleteForumPost
              mainPostID={mainPost._id}
              show={owner.owner === currrentUser}
              repliesID={repliesID}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Table borderless className="fixed">
          <tbody>
          <tr>
            <td width="80%">{mainPost.content}</td>
            <td width="20%">
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
  currrentUser: PropTypes.string,
  repliesID: PropTypes.array,
};

export default ForumMainPostCard;
