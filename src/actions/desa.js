import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery, foldErrorValidations } from '../lib/helpers'
import { setError } from '../reducers/error/actions'

export const UPLOAD_DESA_LOGO_REQUEST = 'UPLOAD_DESA_LOGO_REQUEST'
export const UPLOAD_DESA_LOGO_SUCCESS = 'UPLOAD_DESA_LOGO_SUCCESS'
export const UPLOAD_DESA_LOGO_FAILED = 'UPLOAD_DESA_LOGO_FAILED'
export const uploadLogo = logo => dispatch => {
  dispatch({ type: UPLOAD_DESA_LOGO_REQUEST })

  const body = new window.FormData()
  body.append('logo', logo)

  const request = {
    url: `/village-identity/upload-logo`,
    body,
    customHeaders: {
      'Content-Type': 'multipart/form-data; boundary=------xxx'
    },
    method: 'post'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPLOAD_DESA_LOGO_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: UPLOAD_DESA_LOGO_FAILED })
      dispatch(setError({
        message: foldErrorValidations(e.error_validation),
        scope: 'genericError'
      }))
      throw new Error('upload error')
    })
}

export const FETCH_DESA_DETAIL_REQUEST = 'FETCH_DESA_DETAIL_REQUEST'
export const FETCH_DESA_DETAIL_SUCCESS = 'FETCH_DESA_DETAIL_SUCCESS'
export const FETCH_DESA_DETAIL_FAILED = 'FETCH_DESA_DETAIL_FAILED'
export const fetchDesaDetail = id => dispatch => {
  dispatch({ type: FETCH_DESA_DETAIL_REQUEST })

  const request = {
    url: `/village-identity/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_DESA_DETAIL_SUCCESS, payload: res.data })
      return res.data
    })
    .catch(e => {
      dispatch({ type: FETCH_DESA_DETAIL_FAILED })
    })
}

export const FETCH_DESA_REQUEST = 'FETCH_DESA_REQUEST'
export const FETCH_DESA_SUCCESS = 'FETCH_DESA_SUCCESS'
export const FETCH_DESA_FAILED = 'FETCH_DESA_FAILED'
export const fetchDesa = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_DESA_REQUEST })

  const params = buildQuery({
    page,
    field: 'village_id',
    q
  })

  const request = {
    url: `/village-identity${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_DESA_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_DESA_FAILED })
    })
}

export const CREATE_DESA_REQUEST = 'CREATE_DESA_REQUEST'
export const CREATE_DESA_SUCCESS = 'CREATE_DESA_SUCCESS'
export const CREATE_DESA_FAILED = 'CREATE_DESA_FAILED'
export const createDesa = (body) => dispatch => {
  dispatch({ type: CREATE_DESA_REQUEST })

  const request = {
    url: `/village-identity`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_DESA_SUCCESS, payload: res.data })
      dispatch(reset('desa'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.headman_name = e.error_validation.headman_name ? e.error_validation.headman_name.join('<br>') : null
        E.headman_nip = e.error_validation.headman_nip ? e.error_validation.headman_nip.join('<br>') : null
        E.head_subdistrict_name = e.error_validation.head_subdistrict_name ? e.error_validation.head_subdistrict_name.join('<br>') : null
        E.head_subdistrict_nip = e.error_validation.head_subdistrict_nip ? e.error_validation.head_subdistrict_nip.join('<br>') : null
        E.regent_name = e.error_validation.regent_name ? e.error_validation.regent_name.join('<br>') : null
        E.address = e.error_validation.address ? e.error_validation.address.join('<br>') : null
        E.phone = e.error_validation.phone ? e.error_validation.phone.join('<br>') : null
        E.website = e.error_validation.website ? e.error_validation.website.join('<br>') : null
        E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
        E.logo = e.error_validation.logo ? e.error_validation.logo.join('<br>') : null
      }

      dispatch({ type: CREATE_DESA_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_DESA_REQUEST = 'DELETE_DESA_REQUEST'
export const DELETE_DESA_SUCCESS = 'DELETE_DESA_SUCCESS'
export const DELETE_DESA_FAILED = 'DELETE_DESA_FAILED'
export const deleteDesa = ({ id }) => dispatch => {
  dispatch({ type: DELETE_DESA_REQUEST })
  const request = {
    url: `/village-identity/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_DESA_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_DESA_FAILED, e }))
}

export const UPDATE_DESA_REQUEST = 'UPDATE_DESA_REQUEST'
export const UPDATE_DESA_SUCCESS = 'UPDATE_DESA_SUCCESS'
export const UPDATE_DESA_FAILED = 'UPDATE_DESA_FAILED'
export const updateDesa = (id, body) => dispatch => {
  dispatch({ type: UPDATE_DESA_REQUEST })

  if (!body.village_id) {
    body.village_id = id
  }

  const request = {
    url: `/village-identity/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_DESA_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.headman_name = e.error_validation.headman_name ? e.error_validation.headman_name.join('<br>') : null
        E.headman_nip = e.error_validation.headman_nip ? e.error_validation.headman_nip.join('<br>') : null
        E.head_subdistrict_name = e.error_validation.head_subdistrict_name ? e.error_validation.head_subdistrict_name.join('<br>') : null
        E.head_subdistrict_nip = e.error_validation.head_subdistrict_nip ? e.error_validation.head_subdistrict_nip.join('<br>') : null
        E.regent_name = e.error_validation.regent_name ? e.error_validation.regent_name.join('<br>') : null
        E.address = e.error_validation.address ? e.error_validation.address.join('<br>') : null
        E.phone = e.error_validation.phone ? e.error_validation.phone.join('<br>') : null
        E.website = e.error_validation.website ? e.error_validation.website.join('<br>') : null
        E.email = e.error_validation.email ? e.error_validation.email.join('<br>') : null
        E.logo = e.error_validation.logo ? e.error_validation.logo.join('<br>') : null
      }

      dispatch({ type: UPDATE_DESA_FAILED })
      throw new SubmissionError(E)
    })
}
