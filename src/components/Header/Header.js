import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import styles from './Header.module.css';

import { IPSearch } from './IPSearch';
import { IPDisplay } from './IPDisplay';
import { getLocationDataFromIp } from '../../services';
import { IP_DEFAULT_VALUE, LOCATION_ERROR } from '../../constants';

export const Header = ({ location, setLocationFn }) => {
  const [ipDomain, setIpDomain] = useState(IP_DEFAULT_VALUE);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      const { locationObject, isError } = await getLocationDataFromIp(
        ipDomain.value
      );

      console.log('locationObject');
      console.log(locationObject);

      console.log('isError');
      console.log(isError);

      if (isError) {
        return enqueueSnackbar(LOCATION_ERROR, {
          variant: 'error',
        });
      }

      setLocationFn(locationObject);
      setIpDomain({ ...ipDomain, value: locationObject.ip });
    })();
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>IP Address Tracker</h1>
      <IPSearch
        ipDomain={ipDomain}
        setIpDomainFn={setIpDomain}
        setLocationFn={setLocationFn}
      />
      <IPDisplay location={location} />
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  setLocationFn: PropTypes.object.isRequired,
};
