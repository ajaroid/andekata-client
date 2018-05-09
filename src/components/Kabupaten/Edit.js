import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateKabupaten, fetchKabupatenDetail } from '../../actions/kabupaten'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchProvinsiOptions } from '../../reducers/options/provinsi'

class KabupatenEdit extends React.Component {
  componentWillMount () {
    const { id, fetchKabupatenDetail } = this.props
    fetchKabupatenDetail(id).then(response => {
      fetchProvinsiOptions()
    })
  }
  render () {
    const { hasPrivilege, isLoading, updateKabupaten, initialValues, provinsiOptions } = this.props
    if (!hasPrivilege('kabupaten-update')) {
      return (
        <Redirect to='/forbidden/edit-kabpaten' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='bus'
              title='Kabupaten'
              subTitle='Ubah Data Kabupaten' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kabupaten'>Kabupaten</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues}
          onSubmit={updateKabupaten}
          provinsiOptions={provinsiOptions}
          successMessage='Kabupaten sukses diubah'
          isLoading={isLoading}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  isLoading: state.kabupaten.isLoading,
  hasPrivilege: hasPrivilege(state),
  provinsiOptions: state.options.provinsi,
  initialValues: state.kabupaten.detail
})

export default connect(mapStateToProps, { updateKabupaten, fetchKabupatenDetail, fetchProvinsiOptions })(KabupatenEdit)
