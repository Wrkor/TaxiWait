import { MakeRequest } from '../helpers'

export const GetSuggestAddress = async (body, key, params) => {
  const result = await MakeRequest('post', `/api/suggest-address`, key, body, params)

  return result
}

export const GetGeocodeAddress = async (body, key, params) => {
  const result = await MakeRequest('post', `/api/geocode-address`, key, body, params)

  return result?.results
}

export const GetPrice = async (body, key, params) => 
  await MakeRequest('post', `/api/get-price`, key, body, params)

export default {
  GetSuggestAddress,
  GetGeocodeAddress,
  GetPrice,
}