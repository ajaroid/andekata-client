import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Redirect } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import Form from './Form'
import Loader from '../common/Loader'
import { fetchOptions as fetchPekerjaanOptions } from '../../reducers/options/pekerjaan'
import { fetchOptions as fetchAgamaOptions } from '../../reducers/options/agama'
import { fetchOptions as fetchKeperluanSuratOptions } from '../../reducers/options/keperluanSurat'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import { fetchOptions as fetchPendudukOptions } from '../../reducers/options/penduduk'
import debounce from 'lodash.debounce'
import { createSuratPengantar, fillPenduduk } from '../../actions/suratPengantar'
import { path } from 'ramda'

class SuratAdd extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
    this.searchPenduduk = debounce(this.searchPenduduk, 500).bind(this)
    this.handleChangePenduduk = this.handleChangePenduduk.bind(this)
  }
  searchPenduduk (e, data) {
    const { fetchPendudukOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchPendudukOptions({ q: data.searchQuery })
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  handleChangePenduduk (event, data) {
    const id = data
    const { fillPenduduk } = this.props
    return fillPenduduk(id)
  }
  componentWillMount () {
    const { user } = this.props
    const village = path(['employee', 'village'], user)
    this.props.fetchKeperluanSuratOptions({
      type: 1
    })
    this.props.fetchPekerjaanOptions()
    this.props.fetchAgamaOptions()

    if (village) {
      this.props.fetchKelurahanOptions({ q: village.name })
    }
  }
  render () {
    const {
      hasPrivilege,
      isLoading,
      createSuratPengantar,
      user,
      keperluanSuratOptions,
      pekerjaanOptions,
      agamaOptions,
      kelurahanOptions,
      pendudukOptions
    } = this.props
    if (!hasPrivilege('surat-pelayanan-store')) {
      return (
        <Redirect to='/forbidden/surat-pengantar' />
      )
    }

    const village = path(['employee', 'village'], user)
    const initialValues = {
      village_id: village ? village.id : null
    }
    return (
      <Segment basic>
        {isLoading ? (
          <Loader />
        ) : (
          <Form
            initialValues={initialValues}
            onSubmit={createSuratPengantar}
            searchKelurahan={this.searchKelurahan}
            searchPenduduk={this.searchPenduduk}
            onChangePenduduk={this.handleChangePenduduk}
            successMessage='Sukses menambahkan surat pengantar'
            isLoading={isLoading}
            keperluanSuratOptions={keperluanSuratOptions}
            user={user}
            pekerjaanOptions={pekerjaanOptions}
            agamaOptions={agamaOptions}
            kelurahanOptions={kelurahanOptions}
            pendudukOptions={pendudukOptions}
          />
        )}
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.suratPengantar.isLoading,
  hasPrivilege: hasPrivilege(state),
  user: state.auth.user,
  keperluanSuratOptions: state.options.keperluanSurat,
  pekerjaanOptions: state.options.pekerjaan,
  pendudukOptions: state.options.penduduk,
  agamaOptions: state.options.agama,
  kelurahanOptions: state.options.kelurahan
})

export default connect(mapStateToProps, {
  createSuratPengantar,
  fetchKeperluanSuratOptions,
  fetchPekerjaanOptions,
  fetchKelurahanOptions,
  fetchPendudukOptions,
  fetchAgamaOptions,
  fillPenduduk
})(SuratAdd)
