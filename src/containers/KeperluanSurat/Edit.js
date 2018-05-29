import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateKeperluanSurat, fetchKeperluanSuratDetail } from '../../actions/keperluanSurat'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { path } from 'ramda'
import debounce from 'lodash.debounce'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'

class KeperluanSuratEdit extends React.Component {
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
    const {
      id,
      fetchKeperluanSuratDetail,
      user,
      fetchKelurahanOptions
    } = this.props
    fetchKeperluanSuratDetail(id)
    const village = path(['employee', 'village'], user)
    // TODO get default village for superadmin
    if (village) {
      fetchKelurahanOptions({ q: village.name })
    }
  }
  render () {
    const {
      hasPrivilege,
      isLoading,
      updateKeperluanSurat,
      initialValues,
      kelurahanOptions,
      user
    } = this.props
    const village = path(['employee', 'village'], user)
    if (!hasPrivilege('keperluan-surat-update')) {
      return (
        <Redirect to='/forbidden/edit-keperluan-surat' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='archive'
              title='Keperluan Surat'
              subTitle='Edit Data Keperluan Surat' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/keperluan-surat'>KeperluanSurat</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
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
            onSubmit={updateKeperluanSurat}
            successMessage='Keperluan surat sukses diubah'
            kelurahanOptions={kelurahanOptions}
            searchKelurahan={this.searchKelurahan}
            isLoading={isLoading}
          />
        )}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.keperluanSurat.isLoading,
    hasPrivilege: hasPrivilege(state),
    initialValues: state.keperluanSurat.detail,
    kelurahanOptions: state.options.kelurahan,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { updateKeperluanSurat, fetchKelurahanOptions, fetchKeperluanSuratDetail })(KeperluanSuratEdit)
