import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const DELETE_KK_DETAIL_REQUEST = 'DELETE_KK_DETAIL_REQUEST'
export const DELETE_KK_DETAIL_SUCCESS = 'DELETE_KK_DETAIL_SUCCESS'
export const DELETE_KK_DETAIL_FAILED = 'DELETE_KK_DETAIL_FAILED'
export const deleteKkDetail = ({ id }) => dispatch => {
  dispatch({ type: DELETE_KK_DETAIL_REQUEST })
  const request = {
    url: `/kkdetail/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_KK_DETAIL_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_KK_DETAIL_FAILED, e }))
}

export const CREATE_KK_DETAIL_REQUEST = 'CREATE_KK_DETAIL_REQUEST'
export const CREATE_KK_DETAIL_SUCCESS = 'CREATE_KK_DETAIL_SUCCESS'
export const CREATE_KK_DETAIL_FAILED = 'CREATE_KK_DETAIL_FAILED'
export const createKkDetail = (body) => dispatch => {
  dispatch({ type: CREATE_KK_DETAIL_REQUEST })

  const request = {
    url: `/kkdetail`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_KK_DETAIL_SUCCESS, payload: res.data })
      dispatch(reset('kkdetail'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.kk_id = e.error_validation.kk_id ? e.error_validation.status.join('<br>') : null
        E.penduduk_id = e.error_validation.penduduk_id ? e.error_validation.status.join('<br>') : null
        E.status_hubungan_keluarga_id = e.error_validation.status_hubungan_keluarga_id ? e.error_validation.status.join('<br>') : null
      }

      dispatch({ type: CREATE_KK_DETAIL_FAILED })
      throw new SubmissionError(E)
    })
}

export const FETCH_KK_DETAIL_REQUEST = 'FETCH_KK_DETAIL_REQUEST'
export const FETCH_KK_DETAIL_SUCCESS = 'FETCH_KK_DETAIL_SUCCESS'
export const FETCH_KK_DETAIL_FAILED = 'FETCH_KK_DETAIL_FAILED'
export const fetchKkDetail = id => dispatch => {
  dispatch({ type: FETCH_KK_DETAIL_REQUEST })

  const request = {
    url: `/kk/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KK_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KK_DETAIL_FAILED })
    })
}

export const FETCH_KK_REQUEST = 'FETCH_KK_REQUEST'
export const FETCH_KK_SUCCESS = 'FETCH_KK_SUCCESS'
export const FETCH_KK_FAILED = 'FETCH_KK_FAILED'
export const fetchKk = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_KK_REQUEST })

  const params = buildQuery({
    field: 'nama',
    page,
    q
  })

  const request = {
    url: `/kk${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KK_FAILED })
    })
}

export const CREATE_KK_REQUEST = 'CREATE_KK_REQUEST'
export const CREATE_KK_SUCCESS = 'CREATE_KK_SUCCESS'
export const CREATE_KK_FAILED = 'CREATE_KK_FAILED'
export const createKk = (body) => dispatch => {
  dispatch({ type: CREATE_KK_REQUEST })

  const request = {
    url: `/kk`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_KK_SUCCESS, payload: res.data })
      dispatch(reset('kk'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.no_kk = e.error_validation.no_kk ? e.error_validation.no_kk.join('<br>') : null
        E.alamat = e.error_validation.alamat ? e.error_validation.alamat.join('<br>') : null
        E.rt = e.error_validation.rt ? e.error_validation.rt.join('<br>') : null
        E.rw = e.error_validation.rw ? e.error_validation.rw.join('<br>') : null
        E.kode_pos = e.error_validation.kode_pos ? e.error_validation.kode_pos.join('<br>') : null
        E.status = e.error_validation.status ? e.error_validation.status.join('<br>') : null
      }

      dispatch({ type: CREATE_KK_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_KK_REQUEST = 'DELETE_KK_REQUEST'
export const DELETE_KK_SUCCESS = 'DELETE_KK_SUCCESS'
export const DELETE_KK_FAILED = 'DELETE_KK_FAILED'
export const deleteKk = ({ id }) => dispatch => {
  dispatch({ type: DELETE_KK_REQUEST })
  const request = {
    url: `/kk/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_KK_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_KK_FAILED, e }))
}

export const UPDATE_KK_REQUEST = 'UPDATE_KK_REQUEST'
export const UPDATE_KK_SUCCESS = 'UPDATE_KK_SUCCESS'
export const UPDATE_KK_FAILED = 'UPDATE_KK_FAILED'
export const updateKk = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_KK_REQUEST })

  const request = {
    url: `/kk/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_KK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.no_kk = e.error_validation.no_kk ? e.error_validation.no_kk.join('<br>') : null
        E.alamat = e.error_validation.alamat ? e.error_validation.alamat.join('<br>') : null
        E.rt = e.error_validation.rt ? e.error_validation.rt.join('<br>') : null
        E.rw = e.error_validation.rw ? e.error_validation.rw.join('<br>') : null
        E.kode_pos = e.error_validation.kode_pos ? e.error_validation.kode_pos.join('<br>') : null
        E.status = e.error_validation.status ? e.error_validation.status.join('<br>') : null
      }

      dispatch({ type: UPDATE_KK_FAILED })
      throw new SubmissionError(E)
    })
}
