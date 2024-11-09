import { makeRequest } from '../helpers/'

export const getUserActiveMonitoring = (userId) => 
  makeRequest('get', `/api/users/${userId}/active-order`)

export default {
  getUserActiveMonitoring
}