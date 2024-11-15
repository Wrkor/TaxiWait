import { MakeRequest } from '../helpers'

export const GetSuggestAddress = async (body, key, params) => {
  const result = await MakeRequest('post', `/api/suggest-address`, key, body, params)

  const addresses = result.map(({ address, ref }) => ({
    label: address,
    value: address,
    ref: ref
  }));

    // Фильтрация адресов с длиной label больше 10 символов
  const filteredAddresses = addresses.filter(address => address.label.length > 10 && !!address?.label && address?.label != "undefined");

  // Получение уникальных адресов
  const uniqueAddresses = Array.from(new Map(filteredAddresses.map(item => [item.label, item])).values());
  
  return uniqueAddresses;
}

export const GetGeocodeAddress = async (body, key, params) => {
  const result = await MakeRequest('post', `/api/geocode-address`, key, body, params)

  const geocode = result?.results?.join(",")
  return geocode
}

export const GetPrice = async (body, key, params) => 
  await MakeRequest('post', `/api/get-price`, key, body, params)

export default {
  GetSuggestAddress,
  GetGeocodeAddress,
  GetPrice,
}