import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const IMPORT_PENDUDUK = 'IMPORT_PENDUDUK'
export const IMPORT_PENDUDUK_SUCCESS = 'IMPORT_PENDUDUK_SUCCESS'
export const IMPORT_PENDUDUK_FAILED = 'IMPORT_PENDUDUK_FAILED'
export const importPenduduk = ({ file, village_id }) => (dispatch) => {
  dispatch({ type: IMPORT_PENDUDUK })

  const body = new window.FormData()
  body.append('file', file)
  body.append('village_id', village_id)

  const request = {
    url: `/resident/import-excel`,
    body,
    customHeaders: {
      'Content-Type': 'multipart/form-data; boundary=------xxx'
    },
    method: 'post'
  }
  return dispatch(callApi(request))
    .then(res => {
      const payload = res.data
      dispatch({
        type: IMPORT_PENDUDUK_SUCCESS,
        payload
      })
      return payload
    })
    .catch(e => {
      dispatch({ type: IMPORT_PENDUDUK_FAILED })
      throw new Error('upload error')
    })
}

export const FETCH_PENDUDUK_DETAIL_REQUEST = 'FETCH_PENDUDUK_DETAIL_REQUEST'
export const FETCH_PENDUDUK_DETAIL_SUCCESS = 'FETCH_PENDUDUK_DETAIL_SUCCESS'
export const FETCH_PENDUDUK_DETAIL_FAILED = 'FETCH_PENDUDUK_DETAIL_FAILED'
export const fetchPendudukDetail = id => dispatch => {
  dispatch({ type: FETCH_PENDUDUK_DETAIL_REQUEST })

  const request = {
    url: `/resident/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PENDUDUK_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_PENDUDUK_DETAIL_FAILED })
    })
}

export const FETCH_PENDUDUK_REQUEST = 'FETCH_PENDUDUK_REQUEST'
export const FETCH_PENDUDUK_SUCCESS = 'FETCH_PENDUDUK_SUCCESS'
export const FETCH_PENDUDUK_FAILED = 'FETCH_PENDUDUK_FAILED'
export const fetchPenduduk = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_PENDUDUK_REQUEST })

  const params = buildQuery({
    field: 'name',
    page,
    q
  })

  const request = {
    url: `/resident${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_PENDUDUK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PENDUDUK_FAILED })
    })
}

export const CREATE_PENDUDUK_REQUEST = 'CREATE_PENDUDUK_REQUEST'
export const CREATE_PENDUDUK_SUCCESS = 'CREATE_PENDUDUK_SUCCESS'
export const CREATE_PENDUDUK_FAILED = 'CREATE_PENDUDUK_FAILED'
export const createPenduduk = (body) => dispatch => {
  dispatch({ type: CREATE_PENDUDUK_REQUEST })

  const request = {
    url: `/resident`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_PENDUDUK_SUCCESS, payload: res.data })
      dispatch(reset('resident'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.gender = e.error_validation.gender ? e.error_validation.gender.join('<br>') : null
        E.birth_place = e.error_validation.birth_place ? e.error_validation.birth_place.join('<br>') : null
        E.birth_date = e.error_validation.birth_date ? e.error_validation.birth_date.join('<br>') : null
        E.blood_type = e.error_validation.blood_type ? e.error_validation.blood_type.join('<br>') : null
        E.father_name = e.error_validation.father_name ? e.error_validation.father_name.join('<br>') : null
        E.mother_name = e.error_validation.mother_name ? e.error_validation.mother_name.join('<br>') : null
        E.citizenship = e.error_validation.citizenship ? e.error_validation.citizenship.join('<br>') : null
        E.passport_number = e.error_validation.passport_number ? e.error_validation.passport_number.join('<br>') : null
        E.kitas_number = e.error_validation.kitas_number ? e.error_validation.kitas_number.join('<br>') : null
        E.status = e.error_validation.status ? e.error_validation.status.join('<br>') : null
        E.marital_status_id = e.error_validation.marital_status_id ? e.error_validation.marital_status_id.join('<br>') : null
        E.status_hub_keluarga_id = e.error_validation.status_hub_keluarga_id ? e.error_validation.status_hub_keluarga_id.join('<br>') : null
        E.job_id = e.error_validation.job_id ? e.error_validation.job_id.join('<br>') : null
        E.education_id = e.error_validation.education_id ? e.error_validation.education_id.join('<br>') : null
        E.nik = e.error_validation.nik ? e.error_validation.nik.join('<br>') : null
      }

      dispatch({ type: CREATE_PENDUDUK_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_PENDUDUK_REQUEST = 'DELETE_PENDUDUK_REQUEST'
export const DELETE_PENDUDUK_SUCCESS = 'DELETE_PENDUDUK_SUCCESS'
export const DELETE_PENDUDUK_FAILED = 'DELETE_PENDUDUK_FAILED'
export const deletePenduduk = ({ id }) => dispatch => {
  dispatch({ type: DELETE_PENDUDUK_REQUEST })
  const request = {
    url: `/resident/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_PENDUDUK_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_PENDUDUK_FAILED, e }))
}

export const UPDATE_PENDUDUK_REQUEST = 'UPDATE_PENDUDUK_REQUEST'
export const UPDATE_PENDUDUK_SUCCESS = 'UPDATE_PENDUDUK_SUCCESS'
export const UPDATE_PENDUDUK_FAILED = 'UPDATE_PENDUDUK_FAILED'
export const updatePenduduk = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_PENDUDUK_REQUEST })

  const request = {
    url: `/resident/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_PENDUDUK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.name = e.error_validation.name ? e.error_validation.name.join('<br>') : null
        E.gender = e.error_validation.gender ? e.error_validation.gender.join('<br>') : null
        E.birth_place = e.error_validation.birth_place ? e.error_validation.birth_place.join('<br>') : null
        E.birth_date = e.error_validation.birth_date ? e.error_validation.birth_date.join('<br>') : null
        E.blood_type = e.error_validation.blood_type ? e.error_validation.blood_type.join('<br>') : null
        E.father_name = e.error_validation.father_name ? e.error_validation.father_name.join('<br>') : null
        E.mother_name = e.error_validation.mother_name ? e.error_validation.mother_name.join('<br>') : null
        E.citizenship = e.error_validation.citizenship ? e.error_validation.citizenship.join('<br>') : null
        E.passport_number = e.error_validation.passport_number ? e.error_validation.passport_number.join('<br>') : null
        E.kitas_number = e.error_validation.kitas_number ? e.error_validation.kitas_number.join('<br>') : null
        E.status = e.error_validation.status ? e.error_validation.status.join('<br>') : null
        E.marital_status_id = e.error_validation.marital_status_id ? e.error_validation.marital_status_id.join('<br>') : null
        E.status_hub_keluarga_id = e.error_validation.status_hub_keluarga_id ? e.error_validation.status_hub_keluarga_id.join('<br>') : null
        E.job_id = e.error_validation.job_id ? e.error_validation.job_id.join('<br>') : null
        E.education_id = e.error_validation.education_id ? e.error_validation.education_id.join('<br>') : null
        E.nik = e.error_validation.nik ? e.error_validation.nik.join('<br>') : null
      }

      dispatch({ type: UPDATE_PENDUDUK_FAILED })
      throw new SubmissionError(E)
    })
}
