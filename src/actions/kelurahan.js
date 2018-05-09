import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_KELURAHAN_DETAIL_REQUEST = 'FETCH_KELURAHAN_DETAIL_REQUEST'
export const FETCH_KELURAHAN_DETAIL_SUCCESS = 'FETCH_KELURAHAN_DETAIL_SUCCESS'
export const FETCH_KELURAHAN_DETAIL_FAILED = 'FETCH_KELURAHAN_DETAIL_FAILED'
export const fetchKelurahanDetail = id => dispatch => {
  dispatch({ type: FETCH_KELURAHAN_DETAIL_REQUEST })

  const request = {
    url: `/village/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KELURAHAN_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_KELURAHAN_DETAIL_FAILED })
    })
}

export const FETCH_KELURAHAN_REQUEST = 'FETCH_KELURAHAN_REQUEST'
export const FETCH_KELURAHAN_SUCCESS = 'FETCH_KELURAHAN_SUCCESS'
export const FETCH_KELURAHAN_FAILED = 'FETCH_KELURAHAN_FAILED'
export const fetchKelurahan = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_KELURAHAN_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/village${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KELURAHAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KELURAHAN_FAILED })
    })
}

export const CREATE_KELURAHAN_REQUEST = 'CREATE_KELURAHAN_REQUEST'
export const CREATE_KELURAHAN_SUCCESS = 'CREATE_KELURAHAN_SUCCESS'
export const CREATE_KELURAHAN_FAILED = 'CREATE_KELURAHAN_FAILED'
export const createKelurahan = (body) => dispatch => {
  dispatch({ type: CREATE_KELURAHAN_REQUEST })

  const request = {
    url: `/village`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_KELURAHAN_SUCCESS, payload: res.data })
      dispatch(reset('village'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.subdistrict_id = e.error_validation.subdistrict_id ? e.error_validation.subdistrict_id.join('<br>') : null
      }

      dispatch({ type: CREATE_KELURAHAN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_KELURAHAN_REQUEST = 'DELETE_KELURAHAN_REQUEST'
export const DELETE_KELURAHAN_SUCCESS = 'DELETE_KELURAHAN_SUCCESS'
export const DELETE_KELURAHAN_FAILED = 'DELETE_KELURAHAN_FAILED'
export const deleteKelurahan = ({ id }) => dispatch => {
  dispatch({ type: DELETE_KELURAHAN_REQUEST })
  const request = {
    url: `/village/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_KELURAHAN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_KELURAHAN_FAILED, e }))
}

export const UPDATE_KELURAHAN_REQUEST = 'UPDATE_KELURAHAN_REQUEST'
export const UPDATE_KELURAHAN_SUCCESS = 'UPDATE_KELURAHAN_SUCCESS'
export const UPDATE_KELURAHAN_FAILED = 'UPDATE_KELURAHAN_FAILED'
export const updateKelurahan = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_KELURAHAN_REQUEST })

  const request = {
    url: `/village/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_KELURAHAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.subdistrict_id = e.error_validation.subdistrict_id ? e.error_validation.subdistrict_id.join('<br>') : null
      }

      dispatch({ type: UPDATE_KELURAHAN_FAILED })
      throw new SubmissionError(E)
    })
}
