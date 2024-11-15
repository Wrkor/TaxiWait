import { instance } from '../api/axios'

export const MakeRequest = async ( method, url, key, body, params) => {
  try {
    const response = await instance({
      method,
      url,
      params,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `VK ${key}`,
      },
    });

    return response;
  } 
  catch (e) {
    return Promise.reject(e);
  }
};
