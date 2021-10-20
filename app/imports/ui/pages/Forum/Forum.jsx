import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Col, Container, Nav, Row, Spinner, Tab } from 'react-bootstrap';
import { ForumPosts } from '../../../api/forum/ForumPostCollection';
import ForumPageTab from '../../components/forum/ForumPageTab';

const Forum = ({ username, ready, forumPosts }) => {

  // tab 0
  const mainPosts = forumPosts.filter(forumPost => forumPost.type === 'main_post');
  // tab 1
  const userPosts = mainPosts.filter(forumPost => forumPost.owner === username);
  // tab 2
  const userReplies = forumPosts.filter(forumPost => forumPost.type === 'reply' && forumPost.owner === username);
  const userSubscribedPosts = [];
  userReplies.forEach(reply => {
    const mainPost = forumPosts.find(({ _id }) => _id === reply.mainThread);
    if (!userSubscribedPosts.includes(mainPost) && mainPost.owner !== username) {
      userSubscribedPosts.push(mainPost);
    }
  });

  return (ready ?
    <Container id="page-container">
      <Row className="pb-sm-2">
        <h2>Forums</h2>
      </Row>
      <Row>
        <Tab.Container defaultActiveKey={0}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey={0} style={{ cursor: 'pointer' }}>All Forums</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={1} style={{ cursor: 'pointer' }}>Your Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={2} style={{ cursor: 'pointer' }}>Subscribed Posts</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey={0}>
                  <ForumPageTab originalArray={mainPosts} allForumPosts={forumPosts}/>
                </Tab.Pane>
                <Tab.Pane eventKey={1}>
                  <ForumPageTab originalArray={userPosts} allForumPosts={forumPosts}/>
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                  <ForumPageTab originalArray={userSubscribedPosts} allForumPosts={forumPosts}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container> :
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  );
};

Forum.propTypes = {
  username: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  forumPosts: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = ForumPosts.subscribeForumPostCommunity().ready()
    && username !== undefined;
  const forumPosts = ForumPosts.getForumPostsSortedByDate();
  return {
    username,
    ready,
    forumPosts,
  };
})(Forum);
