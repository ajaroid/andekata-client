import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createKelurahan } from '../../actions/kelurahan'
import Form from './Form'
import { HeaderTitle } from 'components/common'
import { fetchOptions as fetchKecamatanOptions } from '../../reducers/options/kecamatan'
import debounce from 'lodash.debounce'

class KelurahanAdd extends React.Component {
  constructor () {
    super()
    this.searchKecamatan = debounce(this.searchKecamatan, 500).bind(this)
  }
  searchKecamatan (e, data) {
    const { fetchKecamatanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKecamatanOptions({ q: data.searchQuery })
  }
  render () {
    const { hasPrivilege, isLoading, createKelurahan, kecamatanOptions } = this.props
    if (!hasPrivilege('kelurahan-store')) {
      return (
        <Redirect to='/forbidden/tambah-kelurahan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='tree'
              title='Kelurahan'
              subTitle='Tambah Data Kelurahan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kelurahan'>Kelurahan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form
          onSubmit={createKelurahan}
          successMessage='Sukses menambahkan kelurahan'
          isLoading={isLoading}
          kecamatanOptions={kecamatanOptions}
          searchKecamatan={this.searchKecamatan}
        />
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.kelurahan.isLoading,
  kecamatanOptions: state.options.kecamatan
})

export default connect(mapStateToProps, { createKelurahan, fetchKecamatanOptions })(KelurahanAdd)
