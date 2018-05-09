import { SubmissionError, reset, change } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'
import { selectNik } from '../reducers/options/nik'

export const FILL_PENDUDUK = 'FILL_PENDUDUK'
export const fillPenduduk = nik => (dispatch, getState) => {
  const form = 'suratPelayanan'
  const penduduk = selectNik(getState(), nik)

  dispatch(change(form, 'nama', penduduk.nama))
  dispatch(change(form, 'tempat_lahir', penduduk.tempat_lahir))
  dispatch(change(form, 'tanggal_lahir', penduduk.tanggal_lahir))
  // TODO ki pie drg isoh
  dispatch(change(form, 'kewarganegaraan', penduduk.kewarganegaraan))
}

export const FETCH_SURAT_PELAYANAN_DETAIL_REQUEST = 'FETCH_SURAT_PELAYANAN_DETAIL_REQUEST'
export const FETCH_SURAT_PELAYANAN_DETAIL_SUCCESS = 'FETCH_SURAT_PELAYANAN_DETAIL_SUCCESS'
export const FETCH_SURAT_PELAYANAN_DETAIL_FAILED = 'FETCH_SURAT_PELAYANAN_DETAIL_FAILED'
export const fetchSuratPelayananDetail = id => dispatch => {
  dispatch({ type: FETCH_SURAT_PELAYANAN_DETAIL_REQUEST })

  const request = {
    url: `/surat-pelayanan/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SURAT_PELAYANAN_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SURAT_PELAYANAN_DETAIL_FAILED })
    })
}

export const FETCH_SURAT_PELAYANAN_REQUEST = 'FETCH_SURAT_PELAYANAN_REQUEST'
export const FETCH_SURAT_PELAYANAN_SUCCESS = 'FETCH_SURAT_PELAYANAN_SUCCESS'
export const FETCH_SURAT_PELAYANAN_FAILED = 'FETCH_SURAT_PELAYANAN_FAILED'
export const fetchSuratPelayanan = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_SURAT_PELAYANAN_REQUEST })

  const params = buildQuery({
    field: 'nama',
    page,
    q
  })

  const request = {
    url: `/surat-pelayanan${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SURAT_PELAYANAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SURAT_PELAYANAN_FAILED })
    })
}

export const CREATE_SURAT_PELAYANAN_REQUEST = 'CREATE_SURAT_PELAYANAN_REQUEST'
export const CREATE_SURAT_PELAYANAN_SUCCESS = 'CREATE_SURAT_PELAYANAN_SUCCESS'
export const CREATE_SURAT_PELAYANAN_FAILED = 'CREATE_SURAT_PELAYANAN_FAILED'
export const createSuratPelayanan = (body) => dispatch => {
  dispatch({ type: CREATE_SURAT_PELAYANAN_REQUEST })

  const request = {
    url: `/surat-pelayanan`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_SURAT_PELAYANAN_SUCCESS, payload: res.data })
      dispatch(reset('suratPelayanan'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.jenis_surat_id = e.error_validation.jenis_surat_id ? e.error_validation.jenis_surat_id.join('<br>') : null
        E.pekerjaan_id = e.error_validation.pekerjaan_id ? e.error_validation.pekerjaan_id.join('<br>') : null
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.tempat_lahir = e.error_validation.tempat_lahir ? e.error_validation.tempat_lahir.join('<br>') : null
        E.tanggal_lahir = e.error_validation.tanggal_lahir ? e.error_validation.tanggal_lahir.join('<br>') : null
        E.kewarganegaraan = e.error_validation.kewarganegaraan ? e.error_validation.kewarganegaraan.join('<br>') : null
        E.alamat = e.error_validation.alamat ? e.error_validation.alamat.join('<br>') : null
        E.rt = e.error_validation.rt ? e.error_validation.rt.join('<br>') : null
        E.rw = e.error_validation.rt ? e.error_validation.rw.join('<br>') : null
        E.no_kk = e.error_validation.no_kk ? e.error_validation.no_kk.join('<br>') : null
        E.tgl_berlaku_dari = e.error_validation.tgl_berlaku_dari ? e.error_validation.tgl_berlaku_dari.join('<br>') : null
        E.tgl_berlaku_sampai = e.error_validation.tgl_berlaku_sampai ? e.error_validation.tgl_berlaku_sampai.join('<br>') : null
        E.keterangan = e.error_validation.keterangan ? e.error_validation.keterangan.join('<br>') : null
      }

      dispatch({ type: CREATE_SURAT_PELAYANAN_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_SURAT_PELAYANAN_REQUEST = 'DELETE_SURAT_PELAYANAN_REQUEST'
export const DELETE_SURAT_PELAYANAN_SUCCESS = 'DELETE_SURAT_PELAYANAN_SUCCESS'
export const DELETE_SURAT_PELAYANAN_FAILED = 'DELETE_SURAT_PELAYANAN_FAILED'
export const deleteSuratPelayanan = ({ id }) => dispatch => {
  dispatch({ type: DELETE_SURAT_PELAYANAN_REQUEST })
  const request = {
    url: `/surat-pelayanan/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_SURAT_PELAYANAN_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_SURAT_PELAYANAN_FAILED, e }))
}

export const UPDATE_SURAT_PELAYANAN_REQUEST = 'UPDATE_SURAT_PELAYANAN_REQUEST'
export const UPDATE_SURAT_PELAYANAN_SUCCESS = 'UPDATE_SURAT_PELAYANAN_SUCCESS'
export const UPDATE_SURAT_PELAYANAN_FAILED = 'UPDATE_SURAT_PELAYANAN_FAILED'
export const updateSuratPelayanan = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_SURAT_PELAYANAN_REQUEST })

  const request = {
    url: `/surat-pelayanan/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_SURAT_PELAYANAN_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.kelurahan_id = e.error_validation.kelurahan_id ? e.error_validation.kelurahan_id.join('<br>') : null
        E.jenis_surat_id = e.error_validation.jenis_surat_id ? e.error_validation.jenis_surat_id.join('<br>') : null
        E.pekerjaan_id = e.error_validation.pekerjaan_id ? e.error_validation.pekerjaan_id.join('<br>') : null
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.tempat_lahir = e.error_validation.tempat_lahir ? e.error_validation.tempat_lahir.join('<br>') : null
        E.tanggal_lahir = e.error_validation.tanggal_lahir ? e.error_validation.tanggal_lahir.join('<br>') : null
        E.no_kk = e.error_validation.no_kk ? e.error_validation.no_kk.join('<br>') : null
        E.kewarganegaraan = e.error_validation.kewarganegaraan ? e.error_validation.kewarganegaraan.join('<br>') : null
        E.alamat = e.error_validation.alamat ? e.error_validation.alamat.join('<br>') : null
        E.rt = e.error_validation.rt ? e.error_validation.rt.join('<br>') : null
        E.rw = e.error_validation.rt ? e.error_validation.rw.join('<br>') : null
        E.tgl_berlaku_dari = e.error_validation.tgl_berlaku_dari ? e.error_validation.tgl_berlaku_dari.join('<br>') : null
        E.tgl_berlaku_sampai = e.error_validation.tgl_berlaku_sampai ? e.error_validation.tgl_berlaku_sampai.join('<br>') : null
        E.keterangan = e.error_validation.keterangan ? e.error_validation.keterangan.join('<br>') : null
      }

      dispatch({ type: UPDATE_SURAT_PELAYANAN_FAILED })
      throw new SubmissionError(E)
    })
}

export const RENDER_SURAT_PELAYANAN_REQUEST = 'RENDER_SURAT_PELAYANAN_REQUEST'
export const RENDER_SURAT_PELAYANAN_SUCCESS = 'RENDER_SURAT_PELAYANAN_SUCCESS'
export const RENDER_SURAT_PELAYANAN_FAILED = 'RENDER_SURAT_PELAYANAN_FAILED'
export const renderSuratPelayanan = ({ id }) => dispatch => {
  dispatch({ type: RENDER_SURAT_PELAYANAN_REQUEST })
  const request = {
    url: `/surat-pelayanan/${id}/render`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: RENDER_SURAT_PELAYANAN_SUCCESS }))
    .catch(e => dispatch({ type: RENDER_SURAT_PELAYANAN_FAILED, e }))
}
