import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ForumPosts } from '../../../api/forum/ForumPostCollection';
import { Users } from '../../../api/user/UserCollection';
import ForumMainPostCard from '../../components/forum/ForumMainPostCard';
import ForumRepliesCard from '../../components/forum/ForumRepliesCard';

const ForumPost = ({ ready, users, mainPost, replies }) => (ready ?
    <Container className="pt-sm-3" id="page-container">
      <Row className="pb-sm-2">
        <Link to='/forum'><h2>Forums</h2></Link>
      </Row>
      <Row className="pb-sm-2">
        <Col sm={12}>
          <ForumMainPostCard mainPost={mainPost} owner={users.find(user => user.owner === mainPost.owner)}/>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ForumRepliesCard replies={replies} users={users}/>
        </Col>
      </Row>
    </Container>
  : <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
);

ForumPost.propTypes = {
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  mainPost: PropTypes.object,
  replies: PropTypes.array.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const ready = ForumPosts.subscribeForumPostCommunity().ready()
    && Users.subscribeUserCommunity().ready();
  const users = Users.find({}).fetch();
  const mainPost = ForumPosts.getForumPost(documentId);
  const replies = ForumPosts.getForumPostReplies(documentId);
  return {
    ready,
    users,
    mainPost,
    replies,
  };
})(ForumPost);
