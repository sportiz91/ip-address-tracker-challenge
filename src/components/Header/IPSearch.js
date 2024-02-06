import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';

import styles from './IPSearch.module.css';

import {
  getIpWithDots,
  getIpWithoutDots,
  getLocationDataFromIp,
  getIsDomainBool,
} from '../../services';
import {
  LOCATION_ERROR,
  LOCATION_SUCCESS,
  IP,
  DOMAIN,
  IP_OR_DOMAIN_ERROR_VALUE,
} from '../../constants';

export const IPSearch = ({ ipDomain, setIpDomainFn, setLocationFn }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onInputChangeHandler = (e) => {
    let inputValue = e.target.value;

    const isDomainBool = getIsDomainBool(inputValue);

    if (isDomainBool) {
      return setIpDomainFn({ value: inputValue, type: DOMAIN });
    }

    const ipWithoutDots = getIpWithoutDots(inputValue);

    if (ipWithoutDots.length <= 12) {
      return setIpDomainFn({ value: inputValue, type: IP });
    }

    setIpDomainFn({ value: ipDomain.value, type: IP });
  };

  const onSearchButtonHandler = async () => {
    const { locationObject, isError } = await getLocationDataFromIp(
      ipDomain.value,
      { type: ipDomain.type }
    );

    if (isError) {
      setIpDomainFn(IP_OR_DOMAIN_ERROR_VALUE);
      setLocationFn(null);

      return enqueueSnackbar(LOCATION_ERROR, {
        variant: 'error',
      });
    }

    enqueueSnackbar(LOCATION_SUCCESS, {
      variant: 'success',
    });

    setLocationFn(locationObject);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for any IP address or domain"
        value={
          ipDomain.type === IP ? getIpWithDots(ipDomain.value) : ipDomain.value
        }
        onChange={onInputChangeHandler}
      />
      <button className={styles.searchButton} onClick={onSearchButtonHandler}>
        &gt;
      </button>
    </div>
  );
};

IPSearch.propTypes = {
  ipDomain: PropTypes.object.isRequired,
  setIpDomainFn: PropTypes.func.isRequired,
  setLocationFn: PropTypes.func.isRequired,
};
