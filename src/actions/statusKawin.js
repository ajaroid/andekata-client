import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_STATUS_KAWIN_DETAIL_REQUEST = 'FETCH_STATUS_KAWIN_DETAIL_REQUEST'
export const FETCH_STATUS_KAWIN_DETAIL_SUCCESS = 'FETCH_STATUS_KAWIN_DETAIL_SUCCESS'
export const FETCH_STATUS_KAWIN_DETAIL_FAILED = 'FETCH_STATUS_KAWIN_DETAIL_FAILED'
export const fetchStatusKawinDetail = id => dispatch => {
  dispatch({ type: FETCH_STATUS_KAWIN_DETAIL_REQUEST })

  const request = {
    url: `/marital-status/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_STATUS_KAWIN_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_STATUS_KAWIN_DETAIL_FAILED })
    })
}

export const FETCH_STATUS_KAWIN_REQUEST = 'FETCH_STATUS_KAWIN_REQUEST'
export const FETCH_STATUS_KAWIN_SUCCESS = 'FETCH_STATUS_KAWIN_SUCCESS'
export const FETCH_STATUS_KAWIN_FAILED = 'FETCH_STATUS_KAWIN_FAILED'
export const fetchStatusKawin = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_STATUS_KAWIN_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/marital-status${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_STATUS_KAWIN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_STATUS_KAWIN_FAILED })
    })
}

export const CREATE_STATUS_KAWIN_REQUEST = 'CREATE_STATUS_KAWIN_REQUEST'
export const CREATE_STATUS_KAWIN_SUCCESS = 'CREATE_STATUS_KAWIN_SUCCESS'
export const CREATE_STATUS_KAWIN_FAILED = 'CREATE_STATUS_KAWIN_FAILED'
export const createStatusKawin = ({ name }) => dispatch => {
  dispatch({ type: CREATE_STATUS_KAWIN_REQUEST })

  const request = {
    url: `/marital-status`,
    method: 'post',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_STATUS_KAWIN_SUCCESS, payload: res.data })
      dispatch(reset('maritalStatus'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_STATUS_KAWIN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_STATUS_KAWIN_REQUEST = 'DELETE_STATUS_KAWIN_REQUEST'
export const DELETE_STATUS_KAWIN_SUCCESS = 'DELETE_STATUS_KAWIN_SUCCESS'
export const DELETE_STATUS_KAWIN_FAILED = 'DELETE_STATUS_KAWIN_FAILED'
export const deleteStatusKawin = ({ id }) => dispatch => {
  dispatch({ type: DELETE_STATUS_KAWIN_REQUEST })
  const request = {
    url: `/marital-status/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_STATUS_KAWIN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_STATUS_KAWIN_FAILED, e }))
}

export const UPDATE_STATUS_KAWIN_REQUEST = 'UPDATE_STATUS_KAWIN_REQUEST'
export const UPDATE_STATUS_KAWIN_SUCCESS = 'UPDATE_STATUS_KAWIN_SUCCESS'
export const UPDATE_STATUS_KAWIN_FAILED = 'UPDATE_STATUS_KAWIN_FAILED'
export const updateStatusKawin = ({ id, name }) => dispatch => {
  dispatch({ type: UPDATE_STATUS_KAWIN_REQUEST })

  const request = {
    url: `/marital-status/${id}`,
    method: 'put',
    body: {
      name
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_STATUS_KAWIN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_STATUS_KAWIN_FAILED })
      throw new SubmissionError(E)
    })
}
