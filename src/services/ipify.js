import axios from 'axios';

import { config } from '../config/config';

export const axiosIpify = axios.create({
  baseURL: config.ipifyBaseUrl,
});
