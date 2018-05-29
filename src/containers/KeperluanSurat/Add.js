import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createKeperluanSurat } from '../../actions/keperluanSurat'
import Form from './Form'
import { Loader, HeaderTitle } from 'components/common'
import { path } from 'ramda'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'

class KeperluanSuratAdd extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
  }
  componentWillMount () {
    const { user, fetchKelurahanOptions } = this.props
    const village = path(['employee', 'village'], user)
    if (village) {
      fetchKelurahanOptions({ q: village.name })
    }
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  render () {
    const {
      hasPrivilege,
      user,
      isLoading,
      createKeperluanSurat,
      kelurahanOptions
    } = this.props
    const village = path(['employee', 'village'], user)
    const initialValues = {
      village_id: village ? village.id : null
    }
    if (!hasPrivilege('keperluan-surat-store')) {
      return (
        <Redirect to='/forbidden/tambah-keperluan-surat' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='archive'
              title='Keperluan Surat'
              subTitle='Tambah Data Keperluan Surat' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/keperluan-surat'>KeperluanSurat</Breadcrumb.Section>
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
            isRegularUser={!!village}
            initialValues={initialValues}
            onSubmit={createKeperluanSurat}
            successMessage='Sukses menambahkan keperluan surat'
            searchKelurahan={this.searchKelurahan}
            kelurahanOptions={kelurahanOptions}
            isLoading={isLoading}
          />
        )}
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.keperluanSurat.isLoading,
  hasPrivilege: hasPrivilege(state),
  kelurahanOptions: state.options.kelurahan,
  user: state.auth.user
})

export default connect(mapStateToProps, { createKeperluanSurat, fetchKelurahanOptions })(KeperluanSuratAdd)
