import React from 'react';
import PropTypes from 'prop-types';

import styles from './DetailTitle.module.css';

export const DetailTitle = ({ detailTitle, detailData }) => {
  return (
    <div className={styles.detail}>
      <h2 className={styles.detailTitle}>{detailTitle}</h2>
      <p className={styles.detailData}>{detailData}</p>
    </div>
  );
};

DetailTitle.propTypes = {
  detailTitle: PropTypes.string.isRequired,
  detailData: PropTypes.string.isRequired,
};
