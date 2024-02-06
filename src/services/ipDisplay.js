import { NO_DATA } from '../constants';

export const getLocationDisplayString = (locationObject) => {
  if (!locationObject) {
    return NO_DATA;
  }

  return `${locationObject.location.region}, ${locationObject.location.country} ${locationObject.as.asn}`;
};

export const getTimezoneDisplayString = (locationObject) => {
  if (!locationObject) {
    return NO_DATA;
  }

  return `UTC ${locationObject.location.timezone}`;
};
