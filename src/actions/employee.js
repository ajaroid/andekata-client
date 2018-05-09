import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery, foldErrorValidations } from '../lib/helpers'
import { setError } from '../reducers/error/actions'

export const x = _x => JSON.parse(JSON.stringify(_x))

export const UPLOAD_EMPLOYEE_PHOTO_REQUEST = 'UPLOAD_EMPLOYEE_PHOTO_REQUEST'
export const UPLOAD_EMPLOYEE_PHOTO_SUCCESS = 'UPLOAD_EMPLOYEE_PHOTO_SUCCESS'
export const UPLOAD_EMPLOYEE_PHOTO_FAILED = 'UPLOAD_EMPLOYEE_PHOTO_FAILED'
export const uploadPhoto = photo => dispatch => {
  dispatch({ type: UPLOAD_EMPLOYEE_PHOTO_REQUEST })

  const body = new window.FormData()
  body.append('photo', photo)

  const request = {
    url: `/employee/upload-photo`,
    body,
    customHeaders: {
      'Content-Type': 'multipart/form-data; boundary=------xxx'
    },
    method: 'post'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPLOAD_EMPLOYEE_PHOTO_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: UPLOAD_EMPLOYEE_PHOTO_FAILED })
      dispatch(setError({
        message: foldErrorValidations(e.error_validation),
        scope: 'genericError'
      }))
      throw new Error('upload error')
    })
}

export const FETCH_EMPLOYEE_DETAIL_REQUEST = 'FETCH_EMPLOYEE_DETAIL_REQUEST'
export const FETCH_EMPLOYEE_DETAIL_SUCCESS = 'FETCH_EMPLOYEE_DETAIL_SUCCESS'
export const FETCH_EMPLOYEE_DETAIL_FAILED = 'FETCH_EMPLOYEE_DETAIL_FAILED'
export const fetchEmployeeDetail = id => dispatch => {
  dispatch({ type: FETCH_EMPLOYEE_DETAIL_REQUEST })

  const request = {
    url: `/employee/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_EMPLOYEE_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_EMPLOYEE_DETAIL_FAILED })
    })
}

export const FETCH_EMPLOYEE_REQUEST = 'FETCH_EMPLOYEE_REQUEST'
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS'
export const FETCH_EMPLOYEE_FAILED = 'FETCH_EMPLOYEE_FAILED'
export const fetchEmployee = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_EMPLOYEE_REQUEST })

  const params = buildQuery({
    page,
    q
  })

  const request = {
    url: `/employee${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_EMPLOYEE_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_EMPLOYEE_FAILED })
    })
}

export const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST'
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS'
export const CREATE_EMPLOYEE_FAILED = 'CREATE_EMPLOYEE_FAILED'
export const createEmployee = (body) => dispatch => {
  dispatch({ type: CREATE_EMPLOYEE_REQUEST })

  const request = {
    url: `/employee`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: res.data })
      dispatch(reset('employee'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.address = e.error_validation.address ? e.error_validation.address.join('<br>') : null
        E.city = e.error_validation.city ? e.error_validation.city.join('<br>') : null
        E.birth_date = e.error_validation.birth_date ? e.error_validation.birth_date.join('<br>') : null
        E.birth_city = e.error_validation.birth_city ? e.error_validation.birth_city.join('<br>') : null
        E.gender = e.error_validation.gender ? e.error_validation.gender.join('<br>') : null
        E.marital_status_id = e.error_validation.marital_status_id ? e.error_validation.marital_status_id.join('<br>') : null
        E.job_status = e.error_validation.job_status ? e.error_validation.job_status.join('<br>') : null
        E.phone_number = e.error_validation.phone_number ? e.error_validation.phone_number.join('<br>') : null
        E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
        E.position_id = e.error_validation.position_id ? e.error_validation.position_id.join('<br>') : null
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.in_date = e.error_validation.in_date ? e.error_validation.in_date.join('<br>') : null
        E.out_date = e.error_validation.out_date ? e.error_validation.out_date.join('<br>') : null
        E.status = e.error_validation.status ? e.error_validation.status.join('<br>') : null
      }

      dispatch({ type: CREATE_EMPLOYEE_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST'
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS'
export const DELETE_EMPLOYEE_FAILED = 'DELETE_EMPLOYEE_FAILED'
export const deleteEmployee = ({ id }) => dispatch => {
  dispatch({ type: DELETE_EMPLOYEE_REQUEST })
  const request = {
    url: `/employee/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_EMPLOYEE_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_EMPLOYEE_FAILED, e }))
}

export const UPDATE_EMPLOYEE_REQUEST = 'UPDATE_EMPLOYEE_REQUEST'
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS'
export const UPDATE_EMPLOYEE_FAILED = 'UPDATE_EMPLOYEE_FAILED'
export const updateEmployee = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_EMPLOYEE_REQUEST })

  const request = {
    url: `/employee/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.code = e.error_validation.code ? e.error_validation.code.join('<br>') : null
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.address = e.error_validation.address ? e.error_validation.address.join('<br>') : null
        E.city = e.error_validation.city ? e.error_validation.city.join('<br>') : null
        E.birth_date = e.error_validation.birth_date ? e.error_validation.birth_date.join('<br>') : null
        E.birth_city = e.error_validation.birth_city ? e.error_validation.birth_city.join('<br>') : null
        E.gender = e.error_validation.gender ? e.error_validation.gender.join('<br>') : null
        E.marital_status_id = e.error_validation.marital_status_id ? e.error_validation.marital_status_id.join('<br>') : null
        E.job_status = e.error_validation.job_status ? e.error_validation.job_status.join('<br>') : null
        E.phone_number = e.error_validation.phone_number ? e.error_validation.phone_number.join('<br>') : null
        E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
        E.position_id = e.error_validation.position_id ? e.error_validation.position_id.join('<br>') : null
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.in_date = e.error_validation.in_date ? e.error_validation.in_date.join('<br>') : null
        E.out_date = e.error_validation.out_date ? e.error_validation.out_date.join('<br>') : null
        E.status = e.error_validation.status ? e.error_validation.status.join('<br>') : null
      }

      dispatch({ type: UPDATE_EMPLOYEE_FAILED })
      throw new SubmissionError(E)
    })
}
