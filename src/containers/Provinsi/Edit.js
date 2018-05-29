import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateProvinsi, fetchProvinsiDetail } from '../../actions/provinsi'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'

class ProvinsiEdit extends React.Component {
  componentWillMount () {
    const { id, fetchProvinsiDetail } = this.props
    fetchProvinsiDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateProvinsi, initialValues } = this.props
    if (!hasPrivilege('provinsi-update')) {
      return (
        <Redirect to='/forbidden/edit-provinsi' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='marker'
              title='Provinsi'
              subTitle='Ubah Data Provinsi' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/provinsi'>Provinsi</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateProvinsi} successMessage='Provinsi Sukses diubah ' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.provinsi.isLoading,
    hasPrivilege: hasPrivilege(state),
    initialValues: state.provinsi.detail
  }
}

export default connect(mapStateToProps, { updateProvinsi, fetchProvinsiDetail })(ProvinsiEdit)
