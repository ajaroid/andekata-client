import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_KABUPATEN_DETAIL_REQUEST = 'FETCH_KABUPATEN_DETAIL_REQUEST'
export const FETCH_KABUPATEN_DETAIL_SUCCESS = 'FETCH_KABUPATEN_DETAIL_SUCCESS'
export const FETCH_KABUPATEN_DETAIL_FAILED = 'FETCH_KABUPATEN_DETAIL_FAILED'
export const fetchKabupatenDetail = id => dispatch => {
  dispatch({ type: FETCH_KABUPATEN_DETAIL_REQUEST })

  const request = {
    url: `/regency/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KABUPATEN_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_KABUPATEN_DETAIL_FAILED })
    })
}

export const FETCH_KABUPATEN_REQUEST = 'FETCH_KABUPATEN_REQUEST'
export const FETCH_KABUPATEN_SUCCESS = 'FETCH_KABUPATEN_SUCCESS'
export const FETCH_KABUPATEN_FAILED = 'FETCH_KABUPATEN_FAILED'
export const fetchKabupaten = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_KABUPATEN_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/regency${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KABUPATEN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KABUPATEN_FAILED })
    })
}

export const CREATE_KABUPATEN_REQUEST = 'CREATE_KABUPATEN_REQUEST'
export const CREATE_KABUPATEN_SUCCESS = 'CREATE_KABUPATEN_SUCCESS'
export const CREATE_KABUPATEN_FAILED = 'CREATE_KABUPATEN_FAILED'
export const createKabupaten = (body) => dispatch => {
  dispatch({ type: CREATE_KABUPATEN_REQUEST })

  const request = {
    url: `/regency`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_KABUPATEN_SUCCESS, payload: res.data })
      dispatch(reset('regency'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.provincy_id = e.error_validation.provincy_id ? e.error_validation.provincy_id.join('<br>') : null
      }

      dispatch({ type: CREATE_KABUPATEN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_KABUPATEN_REQUEST = 'DELETE_KABUPATEN_REQUEST'
export const DELETE_KABUPATEN_SUCCESS = 'DELETE_KABUPATEN_SUCCESS'
export const DELETE_KABUPATEN_FAILED = 'DELETE_KABUPATEN_FAILED'
export const deleteKabupaten = ({ id }) => dispatch => {
  dispatch({ type: DELETE_KABUPATEN_REQUEST })
  const request = {
    url: `/regency/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_KABUPATEN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_KABUPATEN_FAILED, e }))
}

export const UPDATE_KABUPATEN_REQUEST = 'UPDATE_KABUPATEN_REQUEST'
export const UPDATE_KABUPATEN_SUCCESS = 'UPDATE_KABUPATEN_SUCCESS'
export const UPDATE_KABUPATEN_FAILED = 'UPDATE_KABUPATEN_FAILED'
export const updateKabupaten = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_KABUPATEN_REQUEST })

  const request = {
    url: `/regency/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_KABUPATEN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.provincy_id = e.error_validation.provincy_id ? e.error_validation.provincy_id.join('<br>') : null
      }

      dispatch({ type: UPDATE_KABUPATEN_FAILED })
      throw new SubmissionError(E)
    })
}
