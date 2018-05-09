import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_POSITION_DETAIL_REQUEST = 'FETCH_POSITION_DETAIL_REQUEST'
export const FETCH_POSITION_DETAIL_SUCCESS = 'FETCH_POSITION_DETAIL_SUCCESS'
export const FETCH_POSITION_DETAIL_FAILED = 'FETCH_POSITION_DETAIL_FAILED'
export const fetchPositionDetail = id => dispatch => {
  dispatch({ type: FETCH_POSITION_DETAIL_REQUEST })

  const request = {
    url: `/position/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_POSITION_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_POSITION_DETAIL_FAILED })
    })
}

export const FETCH_POSITION_REQUEST = 'FETCH_POSITION_REQUEST'
export const FETCH_POSITION_SUCCESS = 'FETCH_POSITION_SUCCESS'
export const FETCH_POSITION_FAILED = 'FETCH_POSITION_FAILED'
export const fetchPosition = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_POSITION_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/position${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_POSITION_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_POSITION_FAILED })
    })
}

export const CREATE_POSITION_REQUEST = 'CREATE_POSITION_REQUEST'
export const CREATE_POSITION_SUCCESS = 'CREATE_POSITION_SUCCESS'
export const CREATE_POSITION_FAILED = 'CREATE_POSITION_FAILED'
export const createPosition = (body) => dispatch => {
  dispatch({ type: CREATE_POSITION_REQUEST })

  const request = {
    url: `/position`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_POSITION_SUCCESS, payload: res.data })
      dispatch(reset('position'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_POSITION_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_POSITION_REQUEST = 'DELETE_POSITION_REQUEST'
export const DELETE_POSITION_SUCCESS = 'DELETE_POSITION_SUCCESS'
export const DELETE_POSITION_FAILED = 'DELETE_POSITION_FAILED'
export const deletePosition = ({ id }) => dispatch => {
  dispatch({ type: DELETE_POSITION_REQUEST })
  const request = {
    url: `/position/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_POSITION_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_POSITION_FAILED, e }))
}

export const UPDATE_POSITION_REQUEST = 'UPDATE_POSITION_REQUEST'
export const UPDATE_POSITION_SUCCESS = 'UPDATE_POSITION_SUCCESS'
export const UPDATE_POSITION_FAILED = 'UPDATE_POSITION_FAILED'
export const updatePosition = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_POSITION_REQUEST })

  const request = {
    url: `/position/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_POSITION_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_POSITION_FAILED })
      throw new SubmissionError(E)
    })
}
