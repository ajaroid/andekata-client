import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateKecamatan, fetchKecamatanDetail } from '../../actions/kecamatan'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { fetchOptions as fetchKabupatenOptions } from '../../reducers/options/kabupaten'
import debounce from 'lodash.debounce'

class KecamatanEdit extends React.Component {
  constructor () {
    super()
    this.searchKabupaten = debounce(this.searchKabupaten, 500).bind(this)
  }
  searchKabupaten (e, data) {
    const { fetchKabupatenOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKabupatenOptions({ q: data.searchQuery })
  }
  componentWillMount () {
    const { id, fetchKecamatanDetail, fetchKabupatenOptions } = this.props
    fetchKecamatanDetail(id).then(response => {
      fetchKabupatenOptions({ q: response.regency.name })
    })
  }
  render () {
    const { hasPrivilege, isLoading, updateKecamatan, initialValues, kabupatenOptions } = this.props
    if (!hasPrivilege('kecamatan-update')) {
      return (
        <Redirect to='/forbidden/edit-kecamatan' />
      )
    }
    return (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='map signs'
              title='Kecamatan'
              subTitle='Ubah Data Kecamatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kecamatan'>Kecamatan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          initialValues={initialValues}
          onSubmit={updateKecamatan}
          successMessage='Kecamatan sukses diubah'
          kabupatenOptions={kabupatenOptions}
          searchKabupaten={this.searchKabupaten}
          isLoading={isLoading}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  isLoading: state.kecamatan.isLoading,
  hasPrivilege: hasPrivilege(state),
  initialValues: state.kecamatan.detail,
  kabupatenOptions: state.options.kabupaten
})

export default connect(mapStateToProps, { updateKecamatan, fetchKecamatanDetail, fetchKabupatenOptions })(KecamatanEdit)
