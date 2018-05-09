import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_PEKERJAAN_DETAIL_REQUEST = 'FETCH_PEKERJAAN_DETAIL_REQUEST'
export const FETCH_PEKERJAAN_DETAIL_SUCCESS = 'FETCH_PEKERJAAN_DETAIL_SUCCESS'
export const FETCH_PEKERJAAN_DETAIL_FAILED = 'FETCH_PEKERJAAN_DETAIL_FAILED'
export const fetchPekerjaanDetail = id => dispatch => {
  dispatch({ type: FETCH_PEKERJAAN_DETAIL_REQUEST })

  const request = {
    url: `/job/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PEKERJAAN_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PEKERJAAN_DETAIL_FAILED })
    })
}

export const FETCH_PEKERJAAN_REQUEST = 'FETCH_PEKERJAAN_REQUEST'
export const FETCH_PEKERJAAN_SUCCESS = 'FETCH_PEKERJAAN_SUCCESS'
export const FETCH_PEKERJAAN_FAILED = 'FETCH_PEKERJAAN_FAILED'
export const fetchPekerjaan = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_PEKERJAAN_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/job${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PEKERJAAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PEKERJAAN_FAILED })
    })
}

export const CREATE_PEKERJAAN_REQUEST = 'CREATE_PEKERJAAN_REQUEST'
export const CREATE_PEKERJAAN_SUCCESS = 'CREATE_PEKERJAAN_SUCCESS'
export const CREATE_PEKERJAAN_FAILED = 'CREATE_PEKERJAAN_FAILED'
export const createPekerjaan = ({ name }) => dispatch => {
  dispatch({ type: CREATE_PEKERJAAN_REQUEST })

  const request = {
    url: `/job`,
    method: 'post',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_PEKERJAAN_SUCCESS, payload: res.data })
      dispatch(reset('job'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_PEKERJAAN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_PEKERJAAN_REQUEST = 'DELETE_PEKERJAAN_REQUEST'
export const DELETE_PEKERJAAN_SUCCESS = 'DELETE_PEKERJAAN_SUCCESS'
export const DELETE_PEKERJAAN_FAILED = 'DELETE_PEKERJAAN_FAILED'
export const deletePekerjaan = ({ id }) => dispatch => {
  dispatch({ type: DELETE_PEKERJAAN_REQUEST })
  const request = {
    url: `/job/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_PEKERJAAN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_PEKERJAAN_FAILED, e }))
}

export const UPDATE_PEKERJAAN_REQUEST = 'UPDATE_PEKERJAAN_REQUEST'
export const UPDATE_PEKERJAAN_SUCCESS = 'UPDATE_PEKERJAAN_SUCCESS'
export const UPDATE_PEKERJAAN_FAILED = 'UPDATE_PEKERJAAN_FAILED'
export const updatePekerjaan = ({ id, name }) => dispatch => {
  dispatch({ type: UPDATE_PEKERJAAN_REQUEST })

  const request = {
    url: `/job/${id}`,
    method: 'put',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_PEKERJAAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_PEKERJAAN_FAILED })
      throw new SubmissionError(E)
    })
}
