import axios from 'axios'
import globalConstants from '../config/globalConstants'

export const instance = axios.create({
  baseURL: globalConstants.api,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
