import { SubmissionError, reset } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

export const FETCH_SURAT_KELUAR_MASUK_DETAIL_REQUEST = 'FETCH_SURAT_KELUAR_MASUK_DETAIL_REQUEST'
export const FETCH_SURAT_KELUAR_MASUK_DETAIL_SUCCESS = 'FETCH_SURAT_KELUAR_MASUK_DETAIL_SUCCESS'
export const FETCH_SURAT_KELUAR_MASUK_DETAIL_FAILED = 'FETCH_SURAT_KELUAR_MASUK_DETAIL_FAILED'
export const fetchSuratKeluarMasukDetail = id => dispatch => {
  dispatch({ type: FETCH_SURAT_KELUAR_MASUK_DETAIL_REQUEST })

  const request = {
    url: `/surat-keluar-masuk/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SURAT_KELUAR_MASUK_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SURAT_KELUAR_MASUK_DETAIL_FAILED })
    })
}

export const FETCH_SURAT_KELUAR_MASUK_REQUEST = 'FETCH_SURAT_KELUAR_MASUK_REQUEST'
export const FETCH_SURAT_KELUAR_MASUK_SUCCESS = 'FETCH_SURAT_KELUAR_MASUK_SUCCESS'
export const FETCH_SURAT_KELUAR_MASUK_FAILED = 'FETCH_SURAT_KELUAR_MASUK_FAILED'
export const fetchSuratKeluarMasuk = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_SURAT_KELUAR_MASUK_REQUEST })

  const params = buildQuery({
    field: 'dari',
    page,
    q
  })

  const request = {
    url: `/surat-keluar-masuk${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SURAT_KELUAR_MASUK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SURAT_KELUAR_MASUK_FAILED })
    })
}

export const CREATE_SURAT_KELUAR_MASUK_REQUEST = 'CREATE_SURAT_KELUAR_MASUK_REQUEST'
export const CREATE_SURAT_KELUAR_MASUK_SUCCESS = 'CREATE_SURAT_KELUAR_MASUK_SUCCESS'
export const CREATE_SURAT_KELUAR_MASUK_FAILED = 'CREATE_SURAT_KELUAR_MASUK_FAILED'
export const createSuratKeluarMasuk = (body) => dispatch => {
  dispatch({ type: CREATE_SURAT_KELUAR_MASUK_REQUEST })

  const request = {
    url: `/surat-keluar-masuk`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_SURAT_KELUAR_MASUK_SUCCESS, payload: res.data })
      dispatch(reset('suratKeluarMasuk'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.no = e.error_validation.no ? e.error_validation.no.join('<br>') : null
        E.dari = e.error_validation.dari ? e.error_validation.dari.join('<br>') : null
        E.kepada = e.error_validation.kepada ? e.error_validation.kepada.join('<br>') : null
        E.tanggal = e.error_validation.tanggal ? e.error_validation.tanggal.join('<br>') : null
        E.keterangan = e.error_validation.keterangan ? e.error_validation.keterangan.join('<br>') : null
        E.jenis = e.error_validation.jenis ? e.error_validation.jenis.join('<br>') : null
        E.isi = e.error_validation.isi ? e.error_validation.isi.join('<br>') : null
      }

      dispatch({ type: CREATE_SURAT_KELUAR_MASUK_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_SURAT_KELUAR_MASUK_REQUEST = 'DELETE_SURAT_KELUAR_MASUK_REQUEST'
export const DELETE_SURAT_KELUAR_MASUK_SUCCESS = 'DELETE_SURAT_KELUAR_MASUK_SUCCESS'
export const DELETE_SURAT_KELUAR_MASUK_FAILED = 'DELETE_SURAT_KELUAR_MASUK_FAILED'
export const deleteSuratKeluarMasuk = ({ id }) => dispatch => {
  dispatch({ type: DELETE_SURAT_KELUAR_MASUK_REQUEST })
  const request = {
    url: `/surat-keluar-masuk/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_SURAT_KELUAR_MASUK_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_SURAT_KELUAR_MASUK_FAILED, e }))
}

export const UPDATE_SURAT_KELUAR_MASUK_REQUEST = 'UPDATE_SURAT_KELUAR_MASUK_REQUEST'
export const UPDATE_SURAT_KELUAR_MASUK_SUCCESS = 'UPDATE_SURAT_KELUAR_MASUK_SUCCESS'
export const UPDATE_SURAT_KELUAR_MASUK_FAILED = 'UPDATE_SURAT_KELUAR_MASUK_FAILED'
export const updateSuratKeluarMasuk = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_SURAT_KELUAR_MASUK_REQUEST })

  const request = {
    url: `/surat-keluar-masuk/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_SURAT_KELUAR_MASUK_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.no = e.error_validation.no ? e.error_validation.no.join('<br>') : null
        E.dari = e.error_validation.dari ? e.error_validation.dari.join('<br>') : null
        E.kepada = e.error_validation.kepada ? e.error_validation.kepada.join('<br>') : null
        E.tanggal = e.error_validation.tanggal ? e.error_validation.tanggal.join('<br>') : null
        E.keterangan = e.error_validation.keterangan ? e.error_validation.keterangan.join('<br>') : null
        E.jenis = e.error_validation.jenis ? e.error_validation.jenis.join('<br>') : null
        E.isi = e.error_validation.isi ? e.error_validation.isi.join('<br>') : null
      }

      dispatch({ type: UPDATE_SURAT_KELUAR_MASUK_FAILED })
      throw new SubmissionError(E)
    })
}
