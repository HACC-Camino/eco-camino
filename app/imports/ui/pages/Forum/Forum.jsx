import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Col, Container, Nav, Pagination, Row, Spinner, Tab, Table } from 'react-bootstrap';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/all';
import { ForumPosts } from '../../../api/forum/ForumPostCollection';
import ForumPostRow from '../../components/forum/ForumPostRow';
import { getLatestReply, getReplies } from '../../components/forum/utilities';

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
  const [page, setPage] = useState(1);
  const maxRow = 15;
  const mainPosts = forumPosts.filter(forumPost => forumPost.type === 'main_post');
  const userPosts = mainPosts.filter(forumPost => forumPost.owner === username);
  const userReplies = forumPosts.filter(forumPost => forumPost.type === 'reply' && forumPost.owner === username);

  const userSubscribedPosts = [];
  userReplies.forEach(reply => {
    const mainPost = forumPosts.find(({ _id }) => _id === reply.mainThread);
    if (!userSubscribedPosts.includes(mainPost)) {
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

  const getTabContent = (array, tabNum) => {
    const arrayProps = [];
    getRows(array).forEach(element => arrayProps.push(getRowProps(element, getReplies(forumPosts, element._id))));
    const sortedArrayProps = sortDate(arrayProps);
    return (
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
          {sortedArrayProps.map(element => <ForumPostRow
            propsObject={element}
            key={`${element.mainPost._id}_${tabNum}`}/>)}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {getPageItems(array)}
        </Pagination>
      </div>
    );
  };

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
