import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Col, Container, Nav, Row, Spinner, Tab, Table } from 'react-bootstrap';
import { ForumPosts } from '../../../api/forum/ForumPostCollection';
import ForumPostRow from '../../components/forum/ForumPostRow';
import { getLatestReply, getReplies } from '../../components/forum/utilities';
import CustomPagination from '../../components/CustomPagination';

const sortDate = (array) => (array.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)));

const getRowProps = (mainPost, replies) => {
  const result = {};
  result.mainPost = mainPost;
  result.replies = replies;
  result.latestReply = getLatestReply(mainPost, replies);
  result.lastUpdated = result.latestReply.date;
  return result;
};

const Forum = ({ username, ready, forumPosts }) => {
  // start copy for pagination
  const [rows, setRows] = useState([]);
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };
  const maxRow = 10;
  // end copy

  const mainPosts = forumPosts.filter(forumPost => forumPost.type === 'main_post');
  const userPosts = mainPosts.filter(forumPost => forumPost.owner === username);
  const userReplies = forumPosts.filter(forumPost => forumPost.type === 'reply' && forumPost.owner === username);

  const getInitialRows = (array) => array.slice(0, maxRow);

  const userSubscribedPosts = [];
  userReplies.forEach(reply => {
    const mainPost = forumPosts.find(({ _id }) => _id === reply.mainThread);
    if (!userSubscribedPosts.includes(mainPost)) {
      userSubscribedPosts.push(mainPost);
    }
  });

  const getTabContent = (array, tabNum) => {
    const arrayProps = [];
    const pageRows = rows.length ? rows : getInitialRows(array);
    pageRows.forEach(element => arrayProps.push(getRowProps(element, getReplies(forumPosts, element._id))));
    const sortedArrayProps = sortDate(arrayProps);
    return (
      <div>
        <Table striped hover className="fixed">
          <thead>
          <tr>
            <th width="64%">Title</th>
            <th width="6%">Replies</th>
            <th width="15%">Date Created</th>
            <th width="15%">Last Reply</th>
          </tr>
          </thead>
          <tbody>
          {sortedArrayProps.map(element => <ForumPostRow
            propsObject={element}
            key={`${element.mainPost._id}_${tabNum}`}/>)}
          </tbody>
        </Table>
        <CustomPagination
          arrayObjects={array}
          maxRows={maxRow}
          parentCallback={handlePageCallback}
        />
      </div>
    );
  };

  return (ready ?
    <Container id="page-container">
      <Row className="pb-sm-2">
        <h2>Forums</h2>
      </Row>
      <Row>
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">All Forums</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Your Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Subscribed Posts</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {getTabContent(mainPosts, 'first')}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {getTabContent(userPosts, 'second')}
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  {getTabContent(userSubscribedPosts, 'third')}
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
