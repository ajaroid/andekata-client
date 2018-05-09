import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import desa from './desa'
import ui from './ui'
import auth from './auth'
import department from './department'
import pekerjaan from './pekerjaan'
import pendidikan from './pendidikan'
import agama from './agama'
import position from './position'
import penduduk from './penduduk'
import kk from './kk'
import user from './user'
import employee from './employee'
import group from './group'
import shk from './shk'
import keperluanSurat from './keperluanSurat'
import statusKawin from './statusKawin'
import dummy from './dummy.js'
import provinsi from './provinsi'
import kabupaten from './kabupaten'
import kecamatan from './kecamatan'
import kelurahan from './kelurahan'
import suratKeluarMasuk from './suratKeluarMasuk'
import suratPelayanan from './suratPelayanan'
import suratPengantar from './suratPengantar'
import suratKeterangan from './suratKeterangan'
import options from './options/index'
import privilege from './privilege'
import error from './error'

const rootReducer = combineReducers({
  error,
  suratKeterangan,
  suratPengantar,
  desa,
  privilege,
  form,
  auth,
  dummy,
  ui,
  department,
  pekerjaan,
  pendidikan,
  agama,
  position,
  penduduk,
  kk,
  user,
  employee,
  group,
  shk,
  keperluanSurat,
  statusKawin,
  provinsi,
  kabupaten,
  kecamatan,
  kelurahan,
  suratKeluarMasuk,
  suratPelayanan,
  options
})

export default rootReducer
