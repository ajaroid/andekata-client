import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const UPDATE_GROUP_PRIVILEGE_REQUEST = 'UPDATE_GROUP_PRIVILEGE_REQUEST'
export const UPDATE_GROUP_PRIVILEGE_SUCCESS = 'UPDATE_GROUP_PRIVILEGE_SUCCESS'
export const UPDATE_GROUP_PRIVILEGE_FAILED = 'UPDATE_GROUP_PRIVILEGE_FAILED'
export const updateGroupPrivilege = ({ id, name, type }) => dispatch => {
  dispatch({ type: UPDATE_GROUP_PRIVILEGE_REQUEST })

  // type = add | remove

  const request = {
    url: `/group/${id}/privilege/${type}/${name}`,
    method: 'put'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_GROUP_PRIVILEGE_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: UPDATE_GROUP_PRIVILEGE_FAILED })
    })
}

export const UPDATE_GROUP_USERS_REQUEST = 'UPDATE_GROUP_USERS_REQUEST'
export const UPDATE_GROUP_USERS_SUCCESS = 'UPDATE_GROUP_USERS_SUCCESS'
export const UPDATE_GROUP_USERS_FAILED = 'UPDATE_GROUP_USERS_FAILED'
export const updateGroupUsers = ({ id, userIds }) => dispatch => {
  dispatch({ type: UPDATE_GROUP_USERS_REQUEST })

  const request = {
    url: `/group/${id}/users`,
    method: 'put',
    body: {userIds: userIds}
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_GROUP_USERS_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: UPDATE_GROUP_USERS_FAILED })
    })
}

export const FETCH_GROUP_DETAIL_REQUEST = 'FETCH_GROUP_DETAIL_REQUEST'
export const FETCH_GROUP_DETAIL_SUCCESS = 'FETCH_GROUP_DETAIL_SUCCESS'
export const FETCH_GROUP_DETAIL_FAILED = 'FETCH_GROUP_DETAIL_FAILED'
export const fetchGroupDetail = id => dispatch => {
  dispatch({ type: FETCH_GROUP_DETAIL_REQUEST })

  const request = {
    url: `/group/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_GROUP_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_GROUP_DETAIL_FAILED })
    })
}

export const FETCH_GROUP_REQUEST = 'FETCH_GROUP_REQUEST'
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS'
export const FETCH_GROUP_FAILED = 'FETCH_GROUP_FAILED'
export const fetchGroup = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_GROUP_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/group${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_GROUP_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_GROUP_FAILED })
    })
}

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILED = 'CREATE_GROUP_FAILED'
export const createGroup = (body) => dispatch => {
  dispatch({ type: CREATE_GROUP_REQUEST })

  const request = {
    url: `/group`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_GROUP_SUCCESS, payload: res.data })
      dispatch(reset('group'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: CREATE_GROUP_FAILED })
      throw new SubmissionError(E)
    })
}

export const DISMISS_GROUP_ERROR = 'DISMISS_GROUP_ERROR'
export const dismissError = () => ({
  type: DISMISS_GROUP_ERROR
})

export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST'
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS'
export const DELETE_GROUP_FAILED = 'DELETE_GROUP_FAILED'
export const deleteGroup = ({ id }) => dispatch => {
  dispatch({ type: DELETE_GROUP_REQUEST })
  const request = {
    url: `/group/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_GROUP_SUCCESS }))
    .catch(e => {
      dispatch({ type: DELETE_GROUP_FAILED, e })
      return Promise.reject(e)
    })
}

export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST'
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS'
export const UPDATE_GROUP_FAILED = 'UPDATE_GROUP_FAILED'
export const updateGroup = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_GROUP_REQUEST })

  const request = {
    url: `/group/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_GROUP_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
      }

      dispatch({ type: UPDATE_GROUP_FAILED })
      throw new SubmissionError(E)
    })
}
