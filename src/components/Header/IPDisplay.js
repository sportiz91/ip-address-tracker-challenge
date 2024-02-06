import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './IPDisplay.module.css';

import { DetailTitle } from './DetailTitle';
import {
  getLocationDisplayString,
  getTimezoneDisplayString,
} from '../../services';
import { NO_DATA, IP_ADDRESS, LOCATION, TIMEZONE, ISP } from '../../constants';

export const IPDisplay = ({ location }) => {
  const detailList = [
    { detailTitle: IP_ADDRESS, detailData: location?.ip ?? NO_DATA },
    { detailTitle: LOCATION, detailData: getLocationDisplayString(location) },
    { detailTitle: TIMEZONE, detailData: getTimezoneDisplayString(location) },
    { detailTitle: ISP, detailData: location?.ip ?? location?.isp ?? NO_DATA },
  ];

  return (
    <div className={styles.ipDisplay}>
      {detailList.map((item, i) => (
        <Fragment key={item.detailTitle}>
          <DetailTitle
            detailTitle={item.detailTitle}
            detailData={item.detailData}
          />
          <>
            {i !== detailList.length - 1 && <hr className={styles.separator} />}
          </>
        </Fragment>
      ))}
    </div>
  );
};

IPDisplay.propTypes = {
  location: PropTypes.object,
};
