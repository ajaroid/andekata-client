import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_DEPARTMENT_DETAIL_REQUEST = 'FETCH_DEPARTMENT_DETAIL_REQUEST'
export const FETCH_DEPARTMENT_DETAIL_SUCCESS = 'FETCH_DEPARTMENT_DETAIL_SUCCESS'
export const FETCH_DEPARTMENT_DETAIL_FAILED = 'FETCH_DEPARTMENT_DETAIL_FAILED'
export const fetchDepartmentDetail = id => dispatch => {
  dispatch({ type: FETCH_DEPARTMENT_DETAIL_REQUEST })

  const request = {
    url: `/dept/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_DEPARTMENT_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_DEPARTMENT_DETAIL_FAILED })
    })
}

export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST'
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_FAILED = 'FETCH_DEPARTMENT_FAILED'
export const fetchDepartment = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_DEPARTMENT_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/dept${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_DEPARTMENT_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_DEPARTMENT_FAILED })
    })
}

export const CREATE_DEPARTMENT_REQUEST = 'CREATE_DEPARTMENT_REQUEST'
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS'
export const CREATE_DEPARTMENT_FAILED = 'CREATE_DEPARTMENT_FAILED'
export const createDepartment = (body) => dispatch => {
  dispatch({ type: CREATE_DEPARTMENT_REQUEST })

  const request = {
    url: `/dept`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_DEPARTMENT_SUCCESS, payload: res.data })
      dispatch(reset('department'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
      }

      dispatch({ type: CREATE_DEPARTMENT_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_DEPARTMENT_REQUEST = 'DELETE_DEPARTMENT_REQUEST'
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS'
export const DELETE_DEPARTMENT_FAILED = 'DELETE_DEPARTMENT_FAILED'
export const deleteDepartment = ({ id }) => dispatch => {
  dispatch({ type: DELETE_DEPARTMENT_REQUEST })
  const request = {
    url: `/dept/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_DEPARTMENT_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_DEPARTMENT_FAILED, e }))
}

export const UPDATE_DEPARTMENT_REQUEST = 'UPDATE_DEPARTMENT_REQUEST'
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS'
export const UPDATE_DEPARTMENT_FAILED = 'UPDATE_DEPARTMENT_FAILED'
export const updateDepartment = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_DEPARTMENT_REQUEST })

  const request = {
    url: `/dept/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_DEPARTMENT_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
      }

      dispatch({ type: UPDATE_DEPARTMENT_FAILED })
      throw new SubmissionError(E)
    })
}
