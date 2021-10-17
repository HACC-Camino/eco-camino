import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Col, Container, Nav, Pagination, Row, Spinner, Tab, Table } from 'react-bootstrap';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/all';
import { ForumPosts } from '../../../api/forum/ForumPostCollection';
import ForumPostRow from '../../components/forum/ForumPostRow';

const Forum = ({ username, ready, forumPosts }) => {
  const [page, setPage] = useState(1);
  const maxRow = 15;
  const mainPosts = forumPosts.filter(forumPost => forumPost.type === 'main_post');
  const userPosts = mainPosts.filter(forumPost => forumPost.owner === username);
  const userReplies = forumPosts.filter(forumPost => forumPost.type === 'reply' && forumPost.owner === username);

  const userSubscribedPosts = [];
  userReplies.forEach(reply => {
    const mainPost = forumPosts.find(({ _id }) => _id === reply.mainThread);
    if (!userReplies.includes(mainPost)) {
      userSubscribedPosts.push(mainPost);
    }
  });

  const getMaxPage = (array) => Math.ceil(array.length / maxRow);

  const handlePaginationChange = (activePage) => setPage(activePage);

  const getPageItems = (array) => {
    const pageItems = [];
    const maxPage = getMaxPage(array);

    pageItems.push(
      <Pagination.Item
        active={page === 1}
        onClick={() => handlePaginationChange(1)}
        key='first'
        activeLabel=''
      >
        <BsChevronDoubleLeft/>
      </Pagination.Item>,
    );

    for (let iter = 1; iter <= maxPage; iter++) {
      pageItems.push(
        <Pagination.Item
          activeLabel=''
          key={iter}
          active={iter === page}
          onClick={() => handlePaginationChange(iter)}
        >
          {iter}
        </Pagination.Item>,
      );
    }

    pageItems.push(
      <Pagination.Item
        active={page === maxPage}
        onClick={() => handlePaginationChange(maxPage)}
        activeLabel=''
        key='last'
      >
        <BsChevronDoubleRight/>
      </Pagination.Item>,
    );

    return pageItems;
  };

  const getRows = (array) => {
    const start = (page * maxRow) - maxRow;
    const end = (page === getMaxPage(array)) ? array.length : (page * maxRow);
    return array.slice(start, end);
  };

  const getReplies = (array, postID) => array.filter(forumPost => forumPost.mainThread === postID);

  const getTabContent = (array) => (
      <div>
        <Table striped hover className="fixed">
          <thead>
          <tr>
            <th width="60%">Title</th>
            <th width="10%">Replies</th>
            <th width="15%">Date Created</th>
            <th width="15%">Last Reply</th>
          </tr>
          </thead>
          <tbody>
          {getRows(array).map((post) => <ForumPostRow
            mainPost={post}
            key={post._id}
            replies={getReplies(forumPosts, post._id)}/>)}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {getPageItems(array)}
        </Pagination>
      </div>
      );

  return (ready ?
    <Container className="py-sm-3">
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
                  {getTabContent(mainPosts)}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {getTabContent(userPosts)}
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  {getTabContent(userSubscribedPosts)}
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
