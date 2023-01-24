import React from 'react';
import ReactPaginate from 'react-paginate';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  //@ts-ignore
  const { pagesAmount, currentPage } = useSelector((state) => state.pagination);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      //@ts-ignore
      forcePage={parseInt(currentPage - 1)}
      pageCount={pagesAmount}
      previousLabel="<"
    />
  );
};

export default Pagination;
