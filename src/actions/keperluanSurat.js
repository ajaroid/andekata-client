import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_KEPERLUAN_SURAT_DETAIL_REQUEST = 'FETCH_KEPERLUAN_SURAT_DETAIL_REQUEST'
export const FETCH_KEPERLUAN_SURAT_DETAIL_SUCCESS = 'FETCH_KEPERLUAN_SURAT_DETAIL_SUCCESS'
export const FETCH_KEPERLUAN_SURAT_DETAIL_FAILED = 'FETCH_KEPERLUAN_SURAT_DETAIL_FAILED'
export const fetchKeperluanSuratDetail = id => dispatch => {
  dispatch({ type: FETCH_KEPERLUAN_SURAT_DETAIL_REQUEST })

  const request = {
    url: `/keperluan-surat/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KEPERLUAN_SURAT_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KEPERLUAN_SURAT_DETAIL_FAILED })
    })
}

export const FETCH_KEPERLUAN_SURAT_REQUEST = 'FETCH_KEPERLUAN_SURAT_REQUEST'
export const FETCH_KEPERLUAN_SURAT_SUCCESS = 'FETCH_KEPERLUAN_SURAT_SUCCESS'
export const FETCH_KEPERLUAN_SURAT_FAILED = 'FETCH_KEPERLUAN_SURAT_FAILED'
export const fetchKeperluanSurat = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_KEPERLUAN_SURAT_REQUEST })

  const params = buildQuery({
    field: 'nama',
    page,
    q
  })

  const request = {
    url: `/keperluan-surat${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_KEPERLUAN_SURAT_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_KEPERLUAN_SURAT_FAILED })
    })
}

export const CREATE_KEPERLUAN_SURAT_REQUEST = 'CREATE_KEPERLUAN_SURAT_REQUEST'
export const CREATE_KEPERLUAN_SURAT_SUCCESS = 'CREATE_KEPERLUAN_SURAT_SUCCESS'
export const CREATE_KEPERLUAN_SURAT_FAILED = 'CREATE_KEPERLUAN_SURAT_FAILED'
export const createKeperluanSurat = (body) => dispatch => {
  dispatch({ type: CREATE_KEPERLUAN_SURAT_REQUEST })

  const request = {
    url: `/keperluan-surat`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_KEPERLUAN_SURAT_SUCCESS, payload: res.data })
      dispatch(reset('keperluanSurat'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.kode_pelayanan = e.error_validation.kode_pelayanan ? e.error_validation.kode_pelayanan.join('<br>') : null
        E.kode_surat = e.error_validation.kode_surat ? e.error_validation.kode_surat.join('<br>') : null
        E.tipe = e.error_validation.tipe ? e.error_validation.tipe.join('<br>') : null
      }

      dispatch({ type: CREATE_KEPERLUAN_SURAT_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_KEPERLUAN_SURAT_REQUEST = 'DELETE_KEPERLUAN_SURAT_REQUEST'
export const DELETE_KEPERLUAN_SURAT_SUCCESS = 'DELETE_KEPERLUAN_SURAT_SUCCESS'
export const DELETE_KEPERLUAN_SURAT_FAILED = 'DELETE_KEPERLUAN_SURAT_FAILED'
export const deleteKeperluanSurat = ({ id }) => dispatch => {
  dispatch({ type: DELETE_KEPERLUAN_SURAT_REQUEST })
  const request = {
    url: `/keperluan-surat/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_KEPERLUAN_SURAT_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_KEPERLUAN_SURAT_FAILED, e }))
}

export const UPDATE_KEPERLUAN_SURAT_REQUEST = 'UPDATE_KEPERLUAN_SURAT_REQUEST'
export const UPDATE_KEPERLUAN_SURAT_SUCCESS = 'UPDATE_KEPERLUAN_SURAT_SUCCESS'
export const UPDATE_KEPERLUAN_SURAT_FAILED = 'UPDATE_KEPERLUAN_SURAT_FAILED'
export const updateKeperluanSurat = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_KEPERLUAN_SURAT_REQUEST })

  const request = {
    url: `/keperluan-surat/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_KEPERLUAN_SURAT_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.kode_pelayanan = e.error_validation.kode_pelayanan ? e.error_validation.kode_pelayanan.join('<br>') : null
        E.kode_surat = e.error_validation.kode_surat ? e.error_validation.kode_surat.join('<br>') : null
        E.tipe = e.error_validation.tipe ? e.error_validation.tipe.join('<br>') : null
      }

      dispatch({ type: UPDATE_KEPERLUAN_SURAT_FAILED })
      throw new SubmissionError(E)
    })
}
