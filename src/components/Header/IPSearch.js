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

    console.log('inputValueUno');
    console.log(inputValue);

    const isDomainBool = getIsDomainBool(inputValue);

    console.log('isDomainBool');
    console.log(isDomainBool);

    // if (!isDomainBool) {
    //   console.log('insideIsNotDomainBool');

    //   inputValue = getIpWithoutDots(e.target.value);
    // }

    console.log('inputValueDos');
    console.log(inputValue);

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
    console.log('onSearchButtonHandler');

    const { locationObject, isError } = await getLocationDataFromIp(
      ipDomain.value,
      { type: ipDomain.type }
    );

    console.log('locationObject');
    console.log(locationObject);

    console.log('isError');
    console.log(isError);

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
      <button
        className={styles.searchButton}
        // disabled={ipDomain.length !== 12}
        onClick={onSearchButtonHandler}
      >
        &gt;
      </button>
    </div>
  );
};

IPSearch.propTypes = {
  ipDomain: PropTypes.string.isRequired,
  setIpDomainFn: PropTypes.func.isRequired,
  setLocationFn: PropTypes.func.isRequired,
};
