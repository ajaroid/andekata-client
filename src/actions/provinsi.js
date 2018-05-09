import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_PROVINSI_DETAIL_REQUEST = 'FETCH_PROVINSI_DETAIL_REQUEST'
export const FETCH_PROVINSI_DETAIL_SUCCESS = 'FETCH_PROVINSI_DETAIL_SUCCESS'
export const FETCH_PROVINSI_DETAIL_FAILED = 'FETCH_PROVINSI_DETAIL_FAILED'
export const fetchProvinsiDetail = id => dispatch => {
  dispatch({ type: FETCH_PROVINSI_DETAIL_REQUEST })

  const request = {
    url: `/provincy/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PROVINSI_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PROVINSI_DETAIL_FAILED })
    })
}

export const FETCH_PROVINSI_REQUEST = 'FETCH_PROVINSI_REQUEST'
export const FETCH_PROVINSI_SUCCESS = 'FETCH_PROVINSI_SUCCESS'
export const FETCH_PROVINSI_FAILED = 'FETCH_PROVINSI_FAILED'
export const fetchProvinsi = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_PROVINSI_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/provincy${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PROVINSI_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PROVINSI_FAILED })
    })
}

export const CREATE_PROVINSI_REQUEST = 'CREATE_PROVINSI_REQUEST'
export const CREATE_PROVINSI_SUCCESS = 'CREATE_PROVINSI_SUCCESS'
export const CREATE_PROVINSI_FAILED = 'CREATE_PROVINSI_FAILED'
export const createProvinsi = (body) => dispatch => {
  dispatch({ type: CREATE_PROVINSI_REQUEST })

  const request = {
    url: `/provincy`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_PROVINSI_SUCCESS, payload: res.data })
      dispatch(reset('provincy'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.provinsi_id = e.error_validation.provinsi_id ? e.error_validation.provinsi_id.join('<br>') : null
      }

      dispatch({ type: CREATE_PROVINSI_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_PROVINSI_REQUEST = 'DELETE_PROVINSI_REQUEST'
export const DELETE_PROVINSI_SUCCESS = 'DELETE_PROVINSI_SUCCESS'
export const DELETE_PROVINSI_FAILED = 'DELETE_PROVINSI_FAILED'
export const deleteProvinsi = ({ id }) => dispatch => {
  dispatch({ type: DELETE_PROVINSI_REQUEST })
  const request = {
    url: `/provincy/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_PROVINSI_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_PROVINSI_FAILED, e }))
}

export const UPDATE_PROVINSI_REQUEST = 'UPDATE_PROVINSI_REQUEST'
export const UPDATE_PROVINSI_SUCCESS = 'UPDATE_PROVINSI_SUCCESS'
export const UPDATE_PROVINSI_FAILED = 'UPDATE_PROVINSI_FAILED'
export const updateProvinsi = ({ id, name, code }) => dispatch => {
  dispatch({ type: UPDATE_PROVINSI_REQUEST })

  const request = {
    url: `/provincy/${id}`,
    method: 'put',
    body: {
      name,
      code
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_PROVINSI_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
      }

      dispatch({ type: UPDATE_PROVINSI_FAILED })
      throw new SubmissionError(E)
    })
}
