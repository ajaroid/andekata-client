import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_PENDIDIKAN_DETAIL_REQUEST = 'FETCH_PENDIDIKAN_DETAIL_REQUEST'
export const FETCH_PENDIDIKAN_DETAIL_SUCCESS = 'FETCH_PENDIDIKAN_DETAIL_SUCCESS'
export const FETCH_PENDIDIKAN_DETAIL_FAILED = 'FETCH_PENDIDIKAN_DETAIL_FAILED'
export const fetchPendidikanDetail = id => dispatch => {
  dispatch({ type: FETCH_PENDIDIKAN_DETAIL_REQUEST })

  const request = {
    url: `/education/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PENDIDIKAN_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PENDIDIKAN_DETAIL_FAILED })
    })
}

export const FETCH_PENDIDIKAN_REQUEST = 'FETCH_PENDIDIKAN_REQUEST'
export const FETCH_PENDIDIKAN_SUCCESS = 'FETCH_PENDIDIKAN_SUCCESS'
export const FETCH_PENDIDIKAN_FAILED = 'FETCH_PENDIDIKAN_FAILED'
export const fetchPendidikan = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_PENDIDIKAN_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/education${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PENDIDIKAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PENDIDIKAN_FAILED })
    })
}

export const CREATE_PENDIDIKAN_REQUEST = 'CREATE_PENDIDIKAN_REQUEST'
export const CREATE_PENDIDIKAN_SUCCESS = 'CREATE_PENDIDIKAN_SUCCESS'
export const CREATE_PENDIDIKAN_FAILED = 'CREATE_PENDIDIKAN_FAILED'
export const createPendidikan = ({ name }) => dispatch => {
  dispatch({ type: CREATE_PENDIDIKAN_REQUEST })

  const request = {
    url: `/education`,
    method: 'post',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_PENDIDIKAN_SUCCESS, payload: res.data })
      dispatch(reset('education'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_PENDIDIKAN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_PENDIDIKAN_REQUEST = 'DELETE_PENDIDIKAN_REQUEST'
export const DELETE_PENDIDIKAN_SUCCESS = 'DELETE_PENDIDIKAN_SUCCESS'
export const DELETE_PENDIDIKAN_FAILED = 'DELETE_PENDIDIKAN_FAILED'
export const deletePendidikan = ({ id }) => dispatch => {
  dispatch({ type: DELETE_PENDIDIKAN_REQUEST })
  const request = {
    url: `/education/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_PENDIDIKAN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_PENDIDIKAN_FAILED, e }))
}

export const UPDATE_PENDIDIKAN_REQUEST = 'UPDATE_PENDIDIKAN_REQUEST'
export const UPDATE_PENDIDIKAN_SUCCESS = 'UPDATE_PENDIDIKAN_SUCCESS'
export const UPDATE_PENDIDIKAN_FAILED = 'UPDATE_PENDIDIKAN_FAILED'
export const updatePendidikan = ({ id, name }) => dispatch => {
  dispatch({ type: UPDATE_PENDIDIKAN_REQUEST })

  const request = {
    url: `/education/${id}`,
    method: 'put',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_PENDIDIKAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_PENDIDIKAN_FAILED })
      throw new SubmissionError(E)
    })
}
