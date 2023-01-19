import React from 'react';
import ReactPaginate from 'react-paginate';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

import styles from './Pagination.module.scss';

function Pagination() {
  const dispatch = useDispatch();

  const amountPages = useSelector((state) => state.pagination.pagesAmount);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      pageCount={amountPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
