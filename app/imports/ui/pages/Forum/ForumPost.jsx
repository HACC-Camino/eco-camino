import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { ForumPosts } from '../../../api/forum/ForumPostCollection';
import { Users } from '../../../api/user/UserCollection';
import ForumMainPostCard from '../../components/forum/ForumMainPostCard';
import ForumRepliesCard from '../../components/forum/ForumRepliesCard';

const ForumPost = ({ username, ready, users, mainPost, replies }) => (ready ?
    <Container id="page-container">
      <Row className="pb-sm-2">
        <Col className="float-start">
          <Link to='/forum/home'><h2>Forums</h2></Link>
        </Col>
      </Row>
      <Row className="pb-sm-2">
        <Col sm={12}>
          <ForumMainPostCard
            mainPost={mainPost}
            owner={users.find(user => user.owner === mainPost.owner)}
            repliesID={replies.map(reply => reply._id)}
            currentUser={username}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ForumRepliesCard
            mainPost={mainPost}
            mainPostOwner={users.find(user => user.owner === mainPost.owner)}
            replies={replies}
            users={users}
            currentUser={users.find(user => user.owner === username)}
          />
        </Col>
      </Row>
    </Container>
  : <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
);

ForumPost.propTypes = {
  username: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  mainPost: PropTypes.object,
  replies: PropTypes.array.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const username = Meteor.user()?.username;
  const ready = ForumPosts.subscribeForumPostCommunity().ready()
    && Users.subscribeUserCommunity().ready();
  const users = Users.find({}).fetch();
  const mainPost = ForumPosts.getForumPost(documentId);
  const replies = ForumPosts.getForumPostReplies(documentId);
  return {
    username,
    ready,
    users,
    mainPost,
    replies,
  };
})(ForumPost);
