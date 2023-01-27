import React from 'react';

import styles from './NotFound.module.scss';

export const NotFoundPizzas: React.FC = () => {
  return (
    <div className={styles.content}>
      <span>😕</span>
      <br />
      <p>
        We just didn't find pizza.
        <br />
        Please, try it again...
      </p>
    </div>
  );
};
