import axios from 'axios'
import { setError } from '../reducers/error/actions'
// import history from '../lib/history'

// TODO create dynamic configuration for this kind of stuff
export const API_ROOT = process.env.REACT_APP_BASE_API_URL

// simulate network delay
export const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

export const trace = msg => x => {
  console.log(msg, x)
  return x
}

export const TOKEN_EXPIRED = 1000
export const TOKEN_INVALID = 1001
export const TOKEN_BLACKLISTED = 1002
export const TOKEN_NOT_PROVIDED = 1003
export const PRIVILEGE_ACTION_UNAUTHORIZED = 2000

const callApi = ({ url, method = 'get', body: data = {}, customHeaders = {}, ...other }) => (dispatch, getState) => {
  const baseURL = API_ROOT
  const headers = Object.assign({
    'Content-Type': 'application/json'
  }, customHeaders)

  if (getState().auth.token) {
    headers['Authorization'] = `Bearer ${getState().auth.token}`
  }

  return axios({ url, method, data, headers, baseURL, ...other })
    .then(trace('axios response'))
    .then(response => response.data) // extract data from axios response
    .catch(e => {
      console.log('axios E', e.response)
      const { error_code: errorCode } = e.response.data
      if ([TOKEN_EXPIRED, TOKEN_INVALID, TOKEN_NOT_PROVIDED, TOKEN_BLACKLISTED].includes(errorCode)) {
        dispatch(setError({
          message: 'Session expired, silahkan login kembali',
          scope: 'loginError'
        }))
      } else if ([PRIVILEGE_ACTION_UNAUTHORIZED].includes(errorCode)) {
        dispatch(setError({
          message: 'Anda tidak mempunyai hak akses untuk fitur ini',
          scope: 'authorizationError'
        }))
      }
      return Promise.reject(e.response.data)
    })
}

export default callApi
