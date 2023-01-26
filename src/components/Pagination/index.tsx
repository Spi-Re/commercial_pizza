import React from 'react';
import ReactPaginate from 'react-paginate';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  const { pagesAmount, currentPage } = useSelector((state: RootState) => state.filter.pagination);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      // @ts-ignore
      forcePage={parseInt(currentPage - 1)}
      pageCount={pagesAmount}
      previousLabel="<"
    />
  );
};

export default Pagination;
