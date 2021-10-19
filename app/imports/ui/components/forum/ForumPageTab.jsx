import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ForumPostRow from './ForumPostRow';
import { getLatestReply, getReplies } from './utilities';
import CustomPagination from '../CustomPagination';

const sortDate = (array) => (array.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)));

const getRowProps = (mainPost, replies) => {
  const result = {};
  result.mainPost = mainPost;
  result.replies = replies;
  result.latestReply = getLatestReply(mainPost, replies);
  result.lastUpdated = result.latestReply.date;
  return result;
};

const maxRow = 10;

const ForumPageTab = ({ originalArray, allForumPosts }) => {
  const [rows, setRows] = useState(originalArray.slice(0, maxRow));
  const handlePageCallback = (childRows) => {
    setRows(childRows);
  };

  const arrayProps = [];
  rows.forEach(element => arrayProps.push(getRowProps(element, getReplies(allForumPosts, element._id))));
  const sortedArrayProps = sortDate(arrayProps);

  return (
    <div>
      <Table responsive striped hover className="fixed">
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
          key={`${element.mainPost._id}`}/>)}
        </tbody>
      </Table>
      <CustomPagination
        arrayObjects={originalArray}
        maxRows={maxRow}
        parentCallback={handlePageCallback}
      />
    </div>
  );
};

ForumPageTab.propTypes = {
  originalArray: PropTypes.array.isRequired,
  allForumPosts: PropTypes.array.isRequired,
};

export default ForumPageTab;
