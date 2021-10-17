import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/all';

const CustomPagination = ({ arrayObjects, maxRows, parentCallback }) => {
  const [activePage, setActivePage] = useState(1);
  const maxPage = Math.ceil(arrayObjects.length / maxRows);

  const getRows = (array) => {
    const start = (activePage * maxRows) - maxRows;
    const end = (activePage === maxPage) ? array.length : (activePage * maxRows);
    return array.slice(start, end);
  };

  const handlePaginationChange = (selectedPage) => {
    setActivePage(selectedPage);
  };

  useEffect(() => {
    parentCallback(getRows(arrayObjects));
  }, [activePage]);

  const createPageItem = (pageNum, keyValue) => {
    let pageChar;
    if (keyValue === 'first') {
      pageChar = <BsChevronDoubleLeft/>;
    } else if (keyValue === 'last') {
      pageChar = <BsChevronDoubleRight/>;
    } else {
      pageChar = pageNum;
    }

    return <Pagination.Item
      active={activePage === pageNum}
      onClick={() => handlePaginationChange(pageNum)}
      key={keyValue}
      activeLabel=''
    >{pageChar}
    </Pagination.Item>;
  };

  const pageItems = [];
  // get pageItems (page numbers)
  // page item for "first page"
  pageItems.push(createPageItem(1, 'first'));
  for (let iter = 1; iter <= maxPage; iter++) {
    pageItems.push(createPageItem(iter, iter));
  }
  // page item for "last page"
  pageItems.push(createPageItem(maxPage, 'last'));

  return <Pagination className="justify-content-center">{pageItems}</Pagination>;
};

CustomPagination.propTypes = {
  arrayObjects: PropTypes.array.isRequired,
  maxRows: PropTypes.number,
  parentCallback: PropTypes.func.isRequired,
};

export default CustomPagination;
