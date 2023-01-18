import React from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <input className={styles.input} placeholder="Search..." />
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="28px"
          height="28px"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M14.5776 14.5419C15.5805 13.53 16.2 12.1373 16.2 10.6C16.2 7.50721 13.6928 5 10.6 5C7.50721 5 5 7.50721 5 10.6C5 13.6928 7.50721 16.2 10.6 16.2C12.1555 16.2 13.5628 15.5658 14.5776 14.5419ZM14.5776 14.5419L19 19"
            stroke="#464455"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          className={styles.closeIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="28px"
          height="28px"
          viewBox="0 0 24 24"
          fill="none">
          <g clip-path="url(#clip0_429_11083)">
            <path
              d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
              stroke="#292929"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
