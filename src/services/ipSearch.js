import { axiosIpify } from './ipify';
import { ipRegex, httpsProtocolRegex } from '../regex';
import { config } from '../config/config';
import { detectLetters, normalizeString } from '../utils/string';
import { DOMAIN, IP } from '../constants';

export const getIpWithDots = (ipWithoutDots) =>
  ipWithoutDots.replace(ipRegex, '$1.$2.$3.$4');

export const getSanatizedDomain = (inputUrl) => {
  const domainAndPath = inputUrl.replace(httpsProtocolRegex, '');

  const domainAndPathParts = domainAndPath.split('/');

  const domain = normalizeString(domainAndPathParts[0]);

  const sanatizedDomain = domain.startsWith('www.') ? domain : `www.${domain}`;

  return sanatizedDomain;
};

export const getIpWithoutDots = (inputWithDots) =>
  inputWithDots.replace(/[.]/g, '');

export const getLocationDataFromIp = async (ipOrDomain, { type = IP } = {}) => {
  try {
    let sanatizedIpOrDomain = ipOrDomain;

    if (type === IP && ipOrDomain) {
      sanatizedIpOrDomain = getIpWithDots(ipOrDomain);
    }

    if (type === DOMAIN && ipOrDomain) {
      sanatizedIpOrDomain = getSanatizedDomain(ipOrDomain);
    }

    let params = {
      apiKey: config.ipifyKey,
      ipAddress: sanatizedIpOrDomain,
    };

    if (type === IP && !ipOrDomain) {
      delete params.ipAddress;
    }

    if (type !== IP) {
      params = {
        apiKey: config.ipifyKey,
        domain: sanatizedIpOrDomain,
      };
    }

    const response = await axiosIpify.get('', { params });

    return { locationObject: response.data };
  } catch (error) {
    console.error('Error fetching location data:', error);

    return { isError: true };
  }
};

export const getIsDomainBool = (inputString) => detectLetters(inputString);
