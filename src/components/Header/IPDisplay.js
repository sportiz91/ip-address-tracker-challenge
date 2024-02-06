import React from 'react';
import PropTypes from 'prop-types';

import styles from './IPDisplay.module.css';

import { DetailTitle } from './DetailTitle';
import {
  getLocationDisplayString,
  getTimezoneDisplayString,
} from '../../services';
import { NO_DATA } from '../../constants';

export const IPDisplay = ({ location }) => {
  return (
    <div className={styles.ipDisplay}>
      <DetailTitle
        detailTitle="IP Address"
        detailData={location?.ip ?? NO_DATA}
      />
      <DetailTitle
        detailTitle="Location"
        detailData={getLocationDisplayString(location)}
      />
      <DetailTitle
        detailTitle="Timezone"
        detailData={getTimezoneDisplayString(location)}
      />
      <DetailTitle detailTitle="ISP" detailData={location?.isp ?? NO_DATA} />
    </div>
  );
};

IPDisplay.propTypes = {
  location: PropTypes.object.isRequired,
};
