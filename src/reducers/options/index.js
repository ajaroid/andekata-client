import { combineReducers } from 'redux'
import department from './department'
import agama from './agama'
import shk from './shk'
import position from './position'
import employee from './employee'
import penduduk from './penduduk'
import pendidikan from './pendidikan'
import pekerjaan from './pekerjaan'
import provinsi from './provinsi'
import kabupaten from './kabupaten'
import kecamatan from './kecamatan'
import kelurahan from './kelurahan'
import keperluanSurat from './keperluanSurat'
import kk from './kk'
import nik from './nik'
import statusKawin from './statusKawin'
import user from './user'

const optionsReducer = combineReducers({
  department,
  agama,
  pekerjaan,
  shk,
  keperluanSurat,
  kk,
  nik,
  statusKawin,
  position,
  employee,
  penduduk,
  pendidikan,
  provinsi,
  kabupaten,
  kecamatan,
  user,
  kelurahan
})

export default optionsReducer
