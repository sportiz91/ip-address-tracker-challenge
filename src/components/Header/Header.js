import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import styles from './Header.module.css';

import { IPSearch } from './IPSearch';
import { IPDisplay } from './IPDisplay';
import { getLocationDataFromIp } from '../../services';
import { IP_DEFAULT_VALUE, LOCATION_ERROR } from '../../constants';

export const Header = () => {
  const [ipDomain, setIpDomain] = useState(IP_DEFAULT_VALUE);
  const [location, setLocation] = useState(null);

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

      setLocation(locationObject);
    })();
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>IP Address Tracker</h1>
      <IPSearch
        ipDomain={ipDomain}
        setIpDomainFn={setIpDomain}
        setLocationFn={setLocation}
      />
      <IPDisplay location={location} />
    </header>
  );
};
