import React from 'react';
import ReactPaginate from 'react-paginate';

import { useSelector, useDispatch } from 'react-redux';
import { selectPagination } from '../../redux/filter/selectors';
import { setCurrentPage } from '../../redux/filter/slice';

import styles from './Pagination.module.scss';

export const Pagination: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const { pagesAmount, currentPage } = useSelector(selectPagination);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      forcePage={currentPage - 1}
      pageCount={pagesAmount}
      previousLabel="<"
    />
  );
});
