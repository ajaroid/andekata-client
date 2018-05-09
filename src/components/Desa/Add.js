import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createDesa } from '../../actions/desa'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'

class DesaAdd extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  render () {
    const { hasPrivilege, isLoading, createDesa, kelurahanOptions } = this.props
    if (!hasPrivilege('identitas-desa-store')) {
      return (
        <Redirect to='/forbidden/tambah-desa' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='info circle'
              title='Identitas Desa'
              subTitle='Tambah Data Identitas Desa' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/desa'>Identitas Desa</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          kelurahanOptions={kelurahanOptions}
          searchKelurahan={this.searchKelurahan}
          onSubmit={createDesa}
          successMessage='Sukses menambahkan identitas desa'
          isLoading={isLoading}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.desa.isLoading,
  kelurahanOptions: state.options.kelurahan
})

export default connect(mapStateToProps, { createDesa, fetchKelurahanOptions })(DesaAdd)
