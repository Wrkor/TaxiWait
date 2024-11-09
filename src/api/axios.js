import axios from 'axios'
import globalConstants from '../config/globalConstants'

export const instance = axios.create({
  baseURL: globalConstants.api,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `VK ${btoa(window.location.search)}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
