import { SubmissionError } from 'redux-form'
import callApi from './callApi'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const login = (creds = {}) => dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  const request = {
    url: '/auth/login',
    method: 'post',
    body: {
      email: creds.email,
      password: creds.password
    }
  }
  return dispatch(callApi(request))
    .then(
      res => {
        dispatch({ type: LOGIN_SUCCESS, ...res.data })
      },
      e => {
        const E = {}
        E._error = e.error
        if (e.error_validation) {
          E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
          E.password = e.error_validation.password ? e.error_validation.password.join('<br>') : null
        }

        dispatch({ type: LOGIN_FAILED })
        throw new SubmissionError(E)
      }
    )
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const logout = () => ({
  type: LOGOUT_SUCCESS
})
