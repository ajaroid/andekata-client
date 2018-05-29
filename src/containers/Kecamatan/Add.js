import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createKecamatan } from '../../actions/kecamatan'
import Form from './Form'
import { HeaderTitle } from 'components/common'
import { fetchOptions as fetchKabupatenOptions } from '../../reducers/options/kabupaten'
import debounce from 'lodash.debounce'

class KecamatanAdd extends React.Component {
  constructor () {
    super()
    this.searchKabupaten = debounce(this.searchKabupaten, 500).bind(this)
  }
  searchKabupaten (e, data) {
    const { fetchKabupatenOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKabupatenOptions({ q: data.searchQuery })
  }
  render () {
    const { hasPrivilege, isLoading, createKecamatan, kabupatenOptions } = this.props
    if (!hasPrivilege('kecamatan-store')) {
      return (
        <Redirect to='/forbidden/tambah-kecamatan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='map signs'
              title='Kecamatan'
              subTitle='Tambah Data Kecamatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kecamatan'>Kecamatan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form
          onSubmit={createKecamatan}
          kabupatenOptions={kabupatenOptions}
          searchKabupaten={this.searchKabupaten}
          successMessage='Sukses menambahkan kecamatan'
          isLoading={isLoading}
        />
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.kecamatan.isLoading,
  hasPrivilege: hasPrivilege(state),
  kabupatenOptions: state.options.kabupaten
})

export default connect(mapStateToProps, { createKecamatan, fetchKabupatenOptions })(KecamatanAdd)
