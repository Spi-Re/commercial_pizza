import React from 'react';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => (
  <div className={styles.content}>
    <span>😕</span>
    <br />
    <p>Страница не найдена</p>
  </div>
);

export default NotFound;
