import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateDesa, fetchDesaDetail } from '../../actions/desa'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'

class DesaEdit extends React.Component {
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
    const { id, fetchDesaDetail, fetchKelurahanOptions } = this.props
    fetchDesaDetail(id).then(response => {
      fetchKelurahanOptions({ q: response.village.name })
    })
  }
  render () {
    const { hasPrivilege, isLoading, updateDesa, initialValues, kelurahanOptions } = this.props
    if (!hasPrivilege('identitas-desa-update')) {
      return (
        <Redirect to='/forbidden/edit-desa' />
      )
    }
    const { id } = this.props
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='info circle'
              title='Identitas Desa'
              subTitle='Ubah Data Identitas Desa' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/desa'>Identitas Desa</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          initialValues={initialValues}
          onSubmit={updateDesa.bind(null, id)}
          successMessage='Identitas Desa sukses diubah'
          isLoading={isLoading}
          kelurahanOptions={kelurahanOptions}
          searchKelurahan={this.searchKelurahan}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.desa.isLoading,
    initialValues: state.desa.detail,
    kelurahanOptions: state.options.kelurahan
  }
}

export default connect(mapStateToProps, { updateDesa, fetchDesaDetail, fetchKelurahanOptions })(DesaEdit)
