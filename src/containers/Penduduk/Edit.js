import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updatePenduduk, fetchPendudukDetail } from '../../actions/penduduk'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { fetchOptions as fetchAgamaOptions } from '../../reducers/options/agama'
import { fetchOptions as fetchPendudukOptions } from '../../reducers/options/penduduk'
import { fetchOptions as fetchPendidikanOptions } from '../../reducers/options/pendidikan'
import { fetchOptions as fetchPekerjaanOptions } from '../../reducers/options/pekerjaan'
import { fetchOptions as fetchStatusKawinOptions } from '../../reducers/options/statusKawin'
import { fetchOptions as fetchShkOptions } from '../../reducers/options/shk'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'
import { path } from 'ramda'

class PendudukEdit extends React.Component {
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
    const { id, fetchPendudukDetail } = this.props
    fetchPendudukDetail(id).then(response => {
      if (response) {
        this.props.fetchAgamaOptions()
        this.props.fetchPendudukOptions()
        this.props.fetchPendidikanOptions()
        this.props.fetchPekerjaanOptions()
        this.props.fetchStatusKawinOptions()
        this.props.fetchShkOptions()
        this.props.fetchKelurahanOptions({ q: response.village.name })
        // TODO fetch village for superadmin
        const village = path(['employee', 'village'], this.props.user)
        if (village) {
          this.props.fetchKelurahanOptions({ q: village.name })
        }
      }
    })
  }
  render () {
    const {
      hasPrivilege,
      isLoading,
      updatePenduduk,
      initialValues,
      agamaOptions,
      pendudukOptions,
      pekerjaanOptions,
      pendidikanOptions,
      statusKawinOptions,
      shkOptions,
      user,
      kelurahanOptions
    } = this.props
    if (!hasPrivilege('penduduk-update')) {
      return (
        <Redirect to='/forbidden/edit-penduduk' />
      )
    }
    const village = path(['employee', 'village'], user)
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='users'
              title='Penduduk'
              subTitle='Ubah Data Penduduk Desa Saya' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/penduduk'>Penduduk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          initialValues={initialValues}
          onSubmit={updatePenduduk}
          isRegularUser={!!village}
          successMessage='Penduduk sukses diubah'
          isLoading={isLoading}
          searchKelurahan={this.searchKelurahan}
          agamaOptions={agamaOptions}
          pendudukOptions={pendudukOptions}
          pendidikanOptions={pendidikanOptions}
          pekerjaanOptions={pekerjaanOptions}
          statusKawinOptions={statusKawinOptions}
          shkOptions={shkOptions}
          kelurahanOptions={kelurahanOptions}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  isLoading: state.penduduk.isLoading,
  hasPrivilege: hasPrivilege(state),
  initialValues: state.penduduk.detail,
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
  updatePenduduk,
  fetchPendudukDetail,
  fetchAgamaOptions,
  fetchPendudukOptions,
  fetchPendidikanOptions,
  fetchPekerjaanOptions,
  fetchStatusKawinOptions,
  fetchKelurahanOptions,
  fetchShkOptions
})(PendudukEdit)
