import React from 'react';
import ReactPaginate from 'react-paginate';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

import styles from './Pagination.module.scss';

function Pagination() {
  const dispatch = useDispatch();

  const { pagesAmount, currentPage } = useSelector((state) => state.pagination);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      forcePage={parseInt(currentPage - 1)}
      pageCount={pagesAmount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
