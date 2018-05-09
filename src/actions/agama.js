import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_AGAMA_DETAIL_REQUEST = 'FETCH_AGAMA_DETAIL_REQUEST'
export const FETCH_AGAMA_DETAIL_SUCCESS = 'FETCH_AGAMA_DETAIL_SUCCESS'
export const FETCH_AGAMA_DETAIL_FAILED = 'FETCH_AGAMA_DETAIL_FAILED'
export const fetchAgamaDetail = id => dispatch => {
  dispatch({ type: FETCH_AGAMA_DETAIL_REQUEST })

  const request = {
    url: `/religion/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_AGAMA_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_AGAMA_DETAIL_FAILED })
    })
}

export const FETCH_AGAMA_REQUEST = 'FETCH_AGAMA_REQUEST'
export const FETCH_AGAMA_SUCCESS = 'FETCH_AGAMA_SUCCESS'
export const FETCH_AGAMA_FAILED = 'FETCH_AGAMA_FAILED'
export const fetchAgama = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_AGAMA_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/religion${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_AGAMA_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_AGAMA_FAILED })
    })
}

export const CREATE_AGAMA_REQUEST = 'CREATE_AGAMA_REQUEST'
export const CREATE_AGAMA_SUCCESS = 'CREATE_AGAMA_SUCCESS'
export const CREATE_AGAMA_FAILED = 'CREATE_AGAMA_FAILED'
export const createAgama = (body) => dispatch => {
  dispatch({ type: CREATE_AGAMA_REQUEST })

  const request = {
    url: `/religion`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_AGAMA_SUCCESS, payload: res.data })
      dispatch(reset('religion'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_AGAMA_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_AGAMA_REQUEST = 'DELETE_AGAMA_REQUEST'
export const DELETE_AGAMA_SUCCESS = 'DELETE_AGAMA_SUCCESS'
export const DELETE_AGAMA_FAILED = 'DELETE_AGAMA_FAILED'
export const deleteAgama = ({ id }) => dispatch => {
  dispatch({ type: DELETE_AGAMA_REQUEST })
  const request = {
    url: `/religion/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_AGAMA_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_AGAMA_FAILED, e }))
}

export const UPDATE_AGAMA_REQUEST = 'UPDATE_AGAMA_REQUEST'
export const UPDATE_AGAMA_SUCCESS = 'UPDATE_AGAMA_SUCCESS'
export const UPDATE_AGAMA_FAILED = 'UPDATE_AGAMA_FAILED'
export const updateAgama = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_AGAMA_REQUEST })

  const request = {
    url: `/religion/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_AGAMA_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_AGAMA_FAILED })
      throw new SubmissionError(E)
    })
}
