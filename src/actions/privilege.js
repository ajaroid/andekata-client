import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
// import { buildQuery } from '../lib/helpers'

export const FETCH_PRIVILEGE_DETAIL_REQUEST = 'FETCH_PRIVILEGE_DETAIL_REQUEST'
export const FETCH_PRIVILEGE_DETAIL_SUCCESS = 'FETCH_PRIVILEGE_DETAIL_SUCCESS'
export const FETCH_PRIVILEGE_DETAIL_FAILED = 'FETCH_PRIVILEGE_DETAIL_FAILED'
export const fetchPrivilegeDetail = id => dispatch => {
  dispatch({ type: FETCH_PRIVILEGE_DETAIL_REQUEST })

  const request = {
    url: `/privilege/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PRIVILEGE_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PRIVILEGE_DETAIL_FAILED })
    })
}

export const FETCH_PRIVILEGE_REQUEST = 'FETCH_PRIVILEGE_REQUEST'
export const FETCH_PRIVILEGE_SUCCESS = 'FETCH_PRIVILEGE_SUCCESS'
export const FETCH_PRIVILEGE_FAILED = 'FETCH_PRIVILEGE_FAILED'
export const fetchPrivilege = () => dispatch => {
  dispatch({ type: FETCH_PRIVILEGE_REQUEST })

  const request = {
    url: `/privilege?all=1`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PRIVILEGE_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PRIVILEGE_FAILED })
    })
}

export const CREATE_PRIVILEGE_REQUEST = 'CREATE_PRIVILEGE_REQUEST'
export const CREATE_PRIVILEGE_SUCCESS = 'CREATE_PRIVILEGE_SUCCESS'
export const CREATE_PRIVILEGE_FAILED = 'CREATE_PRIVILEGE_FAILED'
export const createPrivilege = ({ name }) => dispatch => {
  dispatch({ type: CREATE_PRIVILEGE_REQUEST })

  const request = {
    url: `/privilege`,
    method: 'post',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_PRIVILEGE_SUCCESS, payload: res.data })
      dispatch(reset('privilege'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_PRIVILEGE_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_PRIVILEGE_REQUEST = 'DELETE_PRIVILEGE_REQUEST'
export const DELETE_PRIVILEGE_SUCCESS = 'DELETE_PRIVILEGE_SUCCESS'
export const DELETE_PRIVILEGE_FAILED = 'DELETE_PRIVILEGE_FAILED'
export const deletePrivilege = ({ id }) => dispatch => {
  dispatch({ type: DELETE_PRIVILEGE_REQUEST })
  const request = {
    url: `/privilege/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_PRIVILEGE_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_PRIVILEGE_FAILED, e }))
}

export const UPDATE_PRIVILEGE_REQUEST = 'UPDATE_PRIVILEGE_REQUEST'
export const UPDATE_PRIVILEGE_SUCCESS = 'UPDATE_PRIVILEGE_SUCCESS'
export const UPDATE_PRIVILEGE_FAILED = 'UPDATE_PRIVILEGE_FAILED'
export const updatePrivilege = ({ id, name }) => dispatch => {
  dispatch({ type: UPDATE_PRIVILEGE_REQUEST })

  const request = {
    url: `/privilege/${id}`,
    method: 'put',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_PRIVILEGE_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_PRIVILEGE_FAILED })
      throw new SubmissionError(E)
    })
}
