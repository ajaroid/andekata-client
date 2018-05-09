import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_KECAMATAN_DETAIL_REQUEST = 'FETCH_KECAMATAN_DETAIL_REQUEST'
export const FETCH_KECAMATAN_DETAIL_SUCCESS = 'FETCH_KECAMATAN_DETAIL_SUCCESS'
export const FETCH_KECAMATAN_DETAIL_FAILED = 'FETCH_KECAMATAN_DETAIL_FAILED'
export const fetchKecamatanDetail = id => dispatch => {
  dispatch({ type: FETCH_KECAMATAN_DETAIL_REQUEST })

  const request = {
    url: `/subdistrict/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KECAMATAN_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_KECAMATAN_DETAIL_FAILED })
    })
}

export const FETCH_KECAMATAN_REQUEST = 'FETCH_KECAMATAN_REQUEST'
export const FETCH_KECAMATAN_SUCCESS = 'FETCH_KECAMATAN_SUCCESS'
export const FETCH_KECAMATAN_FAILED = 'FETCH_KECAMATAN_FAILED'
export const fetchKecamatan = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_KECAMATAN_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/subdistrict${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KECAMATAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KECAMATAN_FAILED })
    })
}

export const CREATE_KECAMATAN_REQUEST = 'CREATE_KECAMATAN_REQUEST'
export const CREATE_KECAMATAN_SUCCESS = 'CREATE_KECAMATAN_SUCCESS'
export const CREATE_KECAMATAN_FAILED = 'CREATE_KECAMATAN_FAILED'
export const createKecamatan = (body) => dispatch => {
  dispatch({ type: CREATE_KECAMATAN_REQUEST })

  const request = {
    url: `/subdistrict`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_KECAMATAN_SUCCESS, payload: res.data })
      dispatch(reset('subdistrict'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.regency_id = e.error_validation.regency_id ? e.error_validation.regency_id.join('<br>') : null
      }

      dispatch({ type: CREATE_KECAMATAN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_KECAMATAN_REQUEST = 'DELETE_KECAMATAN_REQUEST'
export const DELETE_KECAMATAN_SUCCESS = 'DELETE_KECAMATAN_SUCCESS'
export const DELETE_KECAMATAN_FAILED = 'DELETE_KECAMATAN_FAILED'
export const deleteKecamatan = ({ id }) => dispatch => {
  dispatch({ type: DELETE_KECAMATAN_REQUEST })
  const request = {
    url: `/subdistrict/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_KECAMATAN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_KECAMATAN_FAILED, e }))
}

export const UPDATE_KECAMATAN_REQUEST = 'UPDATE_KECAMATAN_REQUEST'
export const UPDATE_KECAMATAN_SUCCESS = 'UPDATE_KECAMATAN_SUCCESS'
export const UPDATE_KECAMATAN_FAILED = 'UPDATE_KECAMATAN_FAILED'
export const updateKecamatan = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_KECAMATAN_REQUEST })

  const request = {
    url: `/subdistrict/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_KECAMATAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.regency_id = e.error_validation.regency_id ? e.error_validation.regency_id.join('<br>') : null
      }

      dispatch({ type: UPDATE_KECAMATAN_FAILED })
      throw new SubmissionError(E)
    })
}
