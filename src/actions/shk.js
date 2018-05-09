import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_SHK_DETAIL_REQUEST = 'FETCH_SHK_DETAIL_REQUEST'
export const FETCH_SHK_DETAIL_SUCCESS = 'FETCH_SHK_DETAIL_SUCCESS'
export const FETCH_SHK_DETAIL_FAILED = 'FETCH_SHK_DETAIL_FAILED'
export const fetchShkDetail = id => dispatch => {
  dispatch({ type: FETCH_SHK_DETAIL_REQUEST })

  const request = {
    url: `/shk/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SHK_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SHK_DETAIL_FAILED })
    })
}

export const FETCH_SHK_REQUEST = 'FETCH_SHK_REQUEST'
export const FETCH_SHK_SUCCESS = 'FETCH_SHK_SUCCESS'
export const FETCH_SHK_FAILED = 'FETCH_SHK_FAILED'
export const fetchShk = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_SHK_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/shk${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SHK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SHK_FAILED })
    })
}

export const CREATE_SHK_REQUEST = 'CREATE_SHK_REQUEST'
export const CREATE_SHK_SUCCESS = 'CREATE_SHK_SUCCESS'
export const CREATE_SHK_FAILED = 'CREATE_SHK_FAILED'
export const createShk = ({ name }) => dispatch => {
  dispatch({ type: CREATE_SHK_REQUEST })

  const request = {
    url: `/shk`,
    method: 'post',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_SHK_SUCCESS, payload: res.data })
      dispatch(reset('shk'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_SHK_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_SHK_REQUEST = 'DELETE_SHK_REQUEST'
export const DELETE_SHK_SUCCESS = 'DELETE_SHK_SUCCESS'
export const DELETE_SHK_FAILED = 'DELETE_SHK_FAILED'
export const deleteShk = ({ id }) => dispatch => {
  dispatch({ type: DELETE_SHK_REQUEST })
  const request = {
    url: `/shk/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_SHK_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_SHK_FAILED, e }))
}

export const UPDATE_SHK_REQUEST = 'UPDATE_SHK_REQUEST'
export const UPDATE_SHK_SUCCESS = 'UPDATE_SHK_SUCCESS'
export const UPDATE_SHK_FAILED = 'UPDATE_SHK_FAILED'
export const updateShk = ({ id, name }) => dispatch => {
  dispatch({ type: UPDATE_SHK_REQUEST })

  const request = {
    url: `/shk/${id}`,
    method: 'put',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_SHK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_SHK_FAILED })
      throw new SubmissionError(E)
    })
}
