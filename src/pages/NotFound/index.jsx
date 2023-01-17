import React from 'react';

import styles from './NotFound.module.scss';

function NotFound() {
  console.log(styles);

  return (
    <div className={styles.content}>
      <span>😕</span>
      <br />
      <p>Страница не найдена</p>
    </div>
  );
}

export default NotFound;
