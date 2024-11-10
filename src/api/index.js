import { getOptionsAddress } from '../config/data'
import { makeRequest } from '../helpers/'

export const getUserActiveMonitoring = (userId) => 
  makeRequest('get', `/api/users/${userId}/active-order`)

export const getAddress = async (value) => 
  getOptionsAddress(value)

export default {
  getUserActiveMonitoring
}