import { axiosIpify } from './ipify';
import { ipRegex, httpsProtocolRegex } from '../regex';
import { config } from '../config/config';
import { detectLetters } from '../utils/string';
import { DOMAIN, IP } from '../constants';

export const getIpWithDots = (ipWithoutDots) =>
  ipWithoutDots.replace(ipRegex, '$1.$2.$3.$4');

export const getSanatizedDomain = (inputUrl) => {
  const domainAndPath = inputUrl.replace(httpsProtocolRegex, '');

  const domainAndPathParts = domainAndPath.split('/');

  const domain = domainAndPathParts[0];

  const sanatizedDomain = domain.startsWith('www.') ? domain : `www.${domain}`;

  return sanatizedDomain;
};

// export const getIpWithoutDots = (inputWithDots) =>
//   inputWithDots.replace(/[.]/g, '');

export const getLocationDataFromIp = async (
  ipOrDomain = '8.8.8.8',
  { type = IP } = {}
) => {
  try {
    console.log('type');
    console.log(type);

    console.log('ipOrDomain');
    console.log(ipOrDomain);

    let sanatizedIpOrDomain = ipOrDomain;

    console.log('sanatizedIpOrDomain');
    console.log(sanatizedIpOrDomain);

    if (type === IP) {
      console.log('insideIpWhenSanatizing');

      sanatizedIpOrDomain = getIpWithDots(ipOrDomain);
    }

    if (type === DOMAIN) {
      console.log('insideDomainWhenSanatizing');

      sanatizedIpOrDomain = getSanatizedDomain(ipOrDomain);
    }

    console.log('sanatizedIpOrDomainDos');
    console.log(sanatizedIpOrDomain);

    let params = {
      apiKey: config.ipifyKey,
      ipAddress: sanatizedIpOrDomain,
    };

    console.log('paramsUno');
    console.log(params);

    if (type !== IP) {
      console.log('insideDomainWhenGettingParams');

      params = {
        apiKey: config.ipifyKey,
        domain: sanatizedIpOrDomain,
      };
    }

    console.log('paramsDos');
    console.log(params);

    const response = await axiosIpify.get('', { params });

    console.log('response');
    console.log(response);

    return { locationObject: response.data };
  } catch (error) {
    console.error('Error fetching location data:', error);

    return { isError: true };
  }
};

export const getIsDomainBool = (inputString) => detectLetters(inputString);

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
