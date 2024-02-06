import React from 'react';
import PropTypes from 'prop-types';

import styles from './DetailTitle.module.css';

export const DetailTitle = ({ detailTitle, detailData }) => {
  return (
    <div className={styles.detail}>
      <div className={styles.detailTitle}>{detailTitle}</div>
      <div>{detailData}</div>
    </div>
  );
};

DetailTitle.propTypes = {
  detailTitle: PropTypes.string.isRequired,
  detailData: PropTypes.string.isRequired,
};
