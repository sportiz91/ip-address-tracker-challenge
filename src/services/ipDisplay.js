import { NO_DATA } from '../constants';

/*
{
    "ip": "192.212.174.101",
    "location": {
        "country": "US",
        "region": "California",
        "timezone": "-08:00"
    },
    "as": {
        "asn": 7127,
        "name": "SCE",
        "route": "192.212.0.0\/15",
        "domain": "",
        "type": ""
    },
    "isp": "Southern California Edison"
}
*/

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
