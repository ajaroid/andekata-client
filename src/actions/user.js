import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_USER_DETAIL_REQUEST = 'FETCH_USER_DETAIL_REQUEST'
export const FETCH_USER_DETAIL_SUCCESS = 'FETCH_USER_DETAIL_SUCCESS'
export const FETCH_USER_DETAIL_FAILED = 'FETCH_USER_DETAIL_FAILED'
export const fetchUserDetail = id => dispatch => {
  dispatch({ type: FETCH_USER_DETAIL_REQUEST })

  const request = {
    url: `/user/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_USER_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_USER_DETAIL_FAILED })
    })
}

export const RESET_PASSWORD_USER_REQUEST = 'RESET_PASSWORD_USER_REQUEST'
export const RESET_PASSWORD_USER_SUCCESS = 'RESET_PASSWORD_USER_SUCCESS'
export const RESET_PASSWORD_USER_FAILED = 'RESET_PASSWORD_USER_FAILED'
export const resetPassword = ({ id, ...body }) => dispatch => {
  console.log('reset password', id, body)
  dispatch({ type: RESET_PASSWORD_USER_REQUEST })

  const request = {
    url: `/user/${id}/password-reset`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: RESET_PASSWORD_USER_SUCCESS, payload: res.data })
      dispatch(reset('userPassword'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.password = e.error_validation.password ? e.error_validation.password.join('<br>') : null
        E.password_new = e.error_validation.password_new ? e.error_validation.password_new.join('<br>') : null
        E.password_confirm = e.error_validation.password_confirm ? e.error_validation.password_confirm.join('<br>') : null
      }

      dispatch({ type: RESET_PASSWORD_USER_FAILED })
      throw new SubmissionError(E)
    })
}

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED'
export const fetchUser = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_USER_REQUEST })

  const params = buildQuery({
    field: 'username',
    page,
    q
  })

  const request = {
    url: `/user${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_USER_FAILED })
    })
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED'
export const createUser = (body) => dispatch => {
  dispatch({ type: CREATE_USER_REQUEST })

  const request = {
    url: `/user`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_USER_SUCCESS, payload: res.data })
      dispatch(reset('user'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.username = e.error_validation.username ? e.error_validation.username.join('<br>') : null
        E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
        E.password = e.error_validation.password ? e.error_validation.password.join('<br>') : null
      }

      dispatch({ type: CREATE_USER_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED'
export const deleteUser = ({ id }) => dispatch => {
  dispatch({ type: DELETE_USER_REQUEST })
  const request = {
    url: `/user/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_USER_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_USER_FAILED, e }))
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'
export const updateUser = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST })

  const request = {
    url: `/user/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.username = e.error_validation.username ? e.error_validation.username.join('<br>') : null
        E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
        E.password = e.error_validation.password ? e.error_validation.password.join('<br>') : null
      }

      dispatch({ type: UPDATE_USER_FAILED })
      throw new SubmissionError(E)
    })
}
