import { SubmissionError, reset, change } from 'redux-form'
import callApi from './callApi'
import { buildQuery } from '../lib/helpers'

// TODO
export const FILL_PENDUDUK = 'FILL_PENDUDUK'
export const fillPenduduk = id => (dispatch, getState) => {
  const form = 'suratPengantar'
  const penduduk = getState().options.penduduk.options.find(i => i.id === id)

  // const penduduk = {
  //   name: 'johny',
  //   tempat_lahir: 'klaten',
  //   tanggal_lahir: '1994-06-15'
  // }

  dispatch(change(form, 'nama', penduduk.name))
  dispatch(change(form, 'tempat_lahir', penduduk.birth_place))
  dispatch(change(form, 'tanggal_lahir', penduduk.birth_date))
  dispatch(change(form, 'nik', penduduk.nik))

  // TODO ki pie selection drg isoh
  dispatch(change(form, 'job_id', penduduk.job_id))
  dispatch(change(form, 'religion_id', penduduk.religion_id))
  dispatch(change(form, 'kewarganegaraan', penduduk.citizenship))

  return penduduk
}

export const FETCH_SURAT_PENGANTAR_DETAIL_REQUEST = 'FETCH_SURAT_PENGANTAR_DETAIL_REQUEST'
export const FETCH_SURAT_PENGANTAR_DETAIL_SUCCESS = 'FETCH_SURAT_PENGANTAR_DETAIL_SUCCESS'
export const FETCH_SURAT_PENGANTAR_DETAIL_FAILED = 'FETCH_SURAT_PENGANTAR_DETAIL_FAILED'
export const fetchSuratPengantarDetail = id => dispatch => {
  dispatch({ type: FETCH_SURAT_PENGANTAR_DETAIL_REQUEST })

  const request = {
    url: `/surat-pelayanan/${id}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SURAT_PENGANTAR_DETAIL_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SURAT_PENGANTAR_DETAIL_FAILED })
    })
}

export const FETCH_SURAT_PENGANTAR_REQUEST = 'FETCH_SURAT_PENGANTAR_REQUEST'
export const FETCH_SURAT_PENGANTAR_SUCCESS = 'FETCH_SURAT_PENGANTAR_SUCCESS'
export const FETCH_SURAT_PENGANTAR_FAILED = 'FETCH_SURAT_PENGANTAR_FAILED'
export const fetchSuratPengantar = ({ page = 1, q }) => dispatch => {
  dispatch({ type: FETCH_SURAT_PENGANTAR_REQUEST })

  const params = buildQuery({
    field: 'nama',
    type: 1,
    page,
    q
  })

  const request = {
    url: `/surat-pelayanan${params}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SURAT_PENGANTAR_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_SURAT_PENGANTAR_FAILED })
    })
}

export const CREATE_SURAT_PENGANTAR_REQUEST = 'CREATE_SURAT_PENGANTAR_REQUEST'
export const CREATE_SURAT_PENGANTAR_SUCCESS = 'CREATE_SURAT_PENGANTAR_SUCCESS'
export const CREATE_SURAT_PENGANTAR_FAILED = 'CREATE_SURAT_PENGANTAR_FAILED'
export const createSuratPengantar = (body) => dispatch => {
  dispatch({ type: CREATE_SURAT_PENGANTAR_REQUEST })

  const request = {
    url: `/surat-pelayanan`,
    method: 'post',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: CREATE_SURAT_PENGANTAR_SUCCESS, payload: res.data })
      dispatch(reset('suratPengantar'))
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.keperluan_surat_id = e.error_validation.keperluan_surat_id ? e.error_validation.keperluan_surat_id.join('<br>') : null
        E.job_id = e.error_validation.job_id ? e.error_validation.job_id.join('<br>') : null
        E.religion_id = e.error_validation.religion_id ? e.error_validation.religion_id.join('<br>') : null
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.tempat_lahir = e.error_validation.tempat_lahir ? e.error_validation.tempat_lahir.join('<br>') : null
        E.tanggal_lahir = e.error_validation.tanggal_lahir ? e.error_validation.tanggal_lahir.join('<br>') : null
        E.kewarganegaraan = e.error_validation.kewarganegaraan ? e.error_validation.kewarganegaraan.join('<br>') : null
        E.alamat = e.error_validation.alamat ? e.error_validation.alamat.join('<br>') : null
        E.rt = e.error_validation.rt ? e.error_validation.rt.join('<br>') : null
        E.rw = e.error_validation.rt ? e.error_validation.rw.join('<br>') : null
        E.no_kk = e.error_validation.no_kk ? e.error_validation.no_kk.join('<br>') : null
        E.nik = e.error_validation.nik ? e.error_validation.nik.join('<br>') : null
        E.tgl_berlaku_dari = e.error_validation.tgl_berlaku_dari ? e.error_validation.tgl_berlaku_dari.join('<br>') : null
        E.tgl_berlaku_sampai = e.error_validation.tgl_berlaku_sampai ? e.error_validation.tgl_berlaku_sampai.join('<br>') : null
        E.keterangan = e.error_validation.keterangan ? e.error_validation.keterangan.join('<br>') : null
      }

      dispatch({ type: CREATE_SURAT_PENGANTAR_FAILED })
      throw new SubmissionError(E)
    })
}

export const DELETE_SURAT_PENGANTAR_REQUEST = 'DELETE_SURAT_PENGANTAR_REQUEST'
export const DELETE_SURAT_PENGANTAR_SUCCESS = 'DELETE_SURAT_PENGANTAR_SUCCESS'
export const DELETE_SURAT_PENGANTAR_FAILED = 'DELETE_SURAT_PENGANTAR_FAILED'
export const deleteSuratPengantar = ({ id }) => dispatch => {
  dispatch({ type: DELETE_SURAT_PENGANTAR_REQUEST })
  const request = {
    url: `/surat-pelayanan/${id}`,
    method: 'delete'
  }
  return dispatch(callApi(request))
    .then(res => dispatch({ type: DELETE_SURAT_PENGANTAR_SUCCESS }))
    .catch(e => dispatch({ type: DELETE_SURAT_PENGANTAR_FAILED, e }))
}

export const UPDATE_SURAT_PENGANTAR_REQUEST = 'UPDATE_SURAT_PENGANTAR_REQUEST'
export const UPDATE_SURAT_PENGANTAR_SUCCESS = 'UPDATE_SURAT_PENGANTAR_SUCCESS'
export const UPDATE_SURAT_PENGANTAR_FAILED = 'UPDATE_SURAT_PENGANTAR_FAILED'
export const updateSuratPengantar = ({ id, ...body }) => dispatch => {
  dispatch({ type: UPDATE_SURAT_PENGANTAR_REQUEST })

  const request = {
    url: `/surat-pelayanan/${id}`,
    method: 'put',
    body
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: UPDATE_SURAT_PENGANTAR_SUCCESS, payload: res.data })
    })
    .catch(e => {
      const E = {}
      E._error = e.error
      if (e.error_validation) {
        E.village_id = e.error_validation.village_id ? e.error_validation.village_id.join('<br>') : null
        E.keperluan_surat_id = e.error_validation.keperluan_surat_id ? e.error_validation.keperluan_surat_id.join('<br>') : null
        E.job_id = e.error_validation.job_id ? e.error_validation.job_id.join('<br>') : null
        E.religion_id = e.error_validation.religion_id ? e.error_validation.religion_id.join('<br>') : null
        E.nama = e.error_validation.nama ? e.error_validation.nama.join('<br>') : null
        E.tempat_lahir = e.error_validation.tempat_lahir ? e.error_validation.tempat_lahir.join('<br>') : null
        E.tanggal_lahir = e.error_validation.tanggal_lahir ? e.error_validation.tanggal_lahir.join('<br>') : null
        E.kewarganegaraan = e.error_validation.kewarganegaraan ? e.error_validation.kewarganegaraan.join('<br>') : null
        E.alamat = e.error_validation.alamat ? e.error_validation.alamat.join('<br>') : null
        E.rt = e.error_validation.rt ? e.error_validation.rt.join('<br>') : null
        E.rw = e.error_validation.rt ? e.error_validation.rw.join('<br>') : null
        E.no_kk = e.error_validation.no_kk ? e.error_validation.no_kk.join('<br>') : null
        E.nik = e.error_validation.nik ? e.error_validation.nik.join('<br>') : null
        E.tgl_berlaku_dari = e.error_validation.tgl_berlaku_dari ? e.error_validation.tgl_berlaku_dari.join('<br>') : null
        E.tgl_berlaku_sampai = e.error_validation.tgl_berlaku_sampai ? e.error_validation.tgl_berlaku_sampai.join('<br>') : null
        E.keterangan = e.error_validation.keterangan ? e.error_validation.keterangan.join('<br>') : null
      }

      dispatch({ type: UPDATE_SURAT_PENGANTAR_FAILED })
      throw new SubmissionError(E)
    })
}

export const RENDER_SURAT_PENGANTAR_REQUEST = 'RENDER_SURAT_PENGANTAR_REQUEST'
export const RENDER_SURAT_PENGANTAR_SUCCESS = 'RENDER_SURAT_PENGANTAR_SUCCESS'
export const RENDER_SURAT_PENGANTAR_FAILED = 'RENDER_SURAT_PENGANTAR_FAILED'
export const renderSuratPengantar = ({ id }) => dispatch => {
  dispatch({ type: RENDER_SURAT_PENGANTAR_REQUEST })
  const request = {
    url: `/surat-pelayanan/${id}/render`,
    method: 'get',
    responseType: 'blob'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: RENDER_SURAT_PENGANTAR_SUCCESS })
      return res
    })
    .catch(e => dispatch({ type: RENDER_SURAT_PENGANTAR_FAILED, e }))
}
