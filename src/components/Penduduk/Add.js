import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createPenduduk } from '../../actions/penduduk'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchAgamaOptions } from '../../reducers/options/agama'
import { fetchOptions as fetchPendudukOptions } from '../../reducers/options/penduduk'
import { fetchOptions as fetchPendidikanOptions } from '../../reducers/options/pendidikan'
import { fetchOptions as fetchPekerjaanOptions } from '../../reducers/options/pekerjaan'
import { fetchOptions as fetchStatusKawinOptions } from '../../reducers/options/statusKawin'
import { fetchOptions as fetchShkOptions } from '../../reducers/options/shk'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'
import { path } from 'ramda'

class PendudukAdd extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  componentWillMount () {
    this.props.fetchAgamaOptions()
    this.props.fetchPendudukOptions()
    this.props.fetchPendidikanOptions()
    this.props.fetchPekerjaanOptions()
    this.props.fetchStatusKawinOptions()
    this.props.fetchShkOptions()
    const village = path(['employee', 'village'], this.props.user)
    if (village) {
      this.props.fetchKelurahanOptions({ q: village.name })
    }
  }
  render () {
    const {
      hasPrivilege,
      isLoading,
      createPenduduk,
      agamaOptions,
      pendudukOptions,
      pekerjaanOptions,
      pendidikanOptions,
      statusKawinOptions,
      shkOptions,
      kelurahanOptions,
      user
    } = this.props
    if (!hasPrivilege('penduduk-store')) {
      return (
        <Redirect to='/forbidden/tambah-penduduk' />
      )
    }
    const village = path(['employee', 'village'], user)
    const initialValues = {
      village_id: village ? village.id : null
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='users'
              title='Penduduk'
              subTitle='Tambah Data Penduduk Desa Saya' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/penduduk'>Penduduk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading ? (
          <Loader />
        ) : (
          <Form
            initialValues={initialValues}
            isRegularUser={!!village}
            onSubmit={createPenduduk}
            successMessage='Sukses menambahkan penduduk'
            isLoading={isLoading}
            searchKelurahan={this.searchKelurahan}
            agamaOptions={agamaOptions}
            pendudukOptions={pendudukOptions}
            pendidikanOptions={pendidikanOptions}
            pekerjaanOptions={pekerjaanOptions}
            statusKawinOptions={statusKawinOptions}
            shkOptions={shkOptions}
            kelurahanOptions={kelurahanOptions}
          />
        )}
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.penduduk.isLoading,
  pendidikanOptions: state.options.pendidikan,
  statusKawinOptions: state.options.statusKawin,
  shkOptions: state.options.shk,
  pekerjaanOptions: state.options.pekerjaan,
  pendudukOptions: state.options.penduduk,
  kelurahanOptions: state.options.kelurahan,
  agamaOptions: state.options.agama,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  createPenduduk,
  fetchAgamaOptions,
  fetchPendudukOptions,
  fetchPendidikanOptions,
  fetchPekerjaanOptions,
  fetchStatusKawinOptions,
  fetchKelurahanOptions,
  fetchShkOptions
})(PendudukAdd)
