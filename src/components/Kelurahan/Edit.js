import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateKelurahan, fetchKelurahanDetail } from '../../actions/kelurahan'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchKecamatanOptions } from '../../reducers/options/kecamatan'
import debounce from 'lodash.debounce'

class KelurahanEdit extends React.Component {
  constructor () {
    super()
    this.searchKecamatan = debounce(this.searchKecamatan, 500).bind(this)
  }
  searchKecamatan (e, data) {
    const { fetchKecamatanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKecamatanOptions({ q: data.searchQuery })
  }
  componentWillMount () {
    const { id, fetchKelurahanDetail } = this.props
    const { fetchKecamatanOptions } = this.props
    fetchKelurahanDetail(id).then(response => {
      fetchKecamatanOptions({ q: response.subdistrict.name })
    })
  }
  render () {
    const { hasPrivilege, isLoading, updateKelurahan, initialValues, kecamatanOptions } = this.props
    if (!hasPrivilege('kelurahan-update')) {
      return (
        <Redirect to='/forbidden/edit-kelurahan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='tree'
              title='Kelurahan'
              subTitle='Ubah Data Kelurahan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kelurahan'>Kelurahan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          initialValues={initialValues}
          onSubmit={updateKelurahan}
          successMessage='Kelurahan sukses diubah'
          isLoading={isLoading}
          kecamatanOptions={kecamatanOptions}
          searchKecamatan={this.searchKecamatan}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  isLoading: state.kelurahan.isLoading,
  hasPrivilege: hasPrivilege(state),
  kecamatanOptions: state.options.kecamatan,
  initialValues: state.kelurahan.detail
})

export default connect(mapStateToProps, { updateKelurahan, fetchKelurahanDetail, fetchKecamatanOptions })(KelurahanEdit)
