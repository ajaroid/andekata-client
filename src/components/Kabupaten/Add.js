import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createKabupaten } from '../../actions/kabupaten'
import Form from './Form'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchProvinsiOptions } from '../../reducers/options/provinsi'

class KabupatenAdd extends React.Component {
  componentWillMount () {
    const { fetchProvinsiOptions } = this.props

    fetchProvinsiOptions()
  }
  render() {
    const { hasPrivilege, isLoading, createKabupaten, provinsiOptions } = this.props
    if (!hasPrivilege('kabupaten-store')) {
      return (
        <Redirect to='/forbidden/tambah-kabupaten' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='bus'
              title='Kabupaten'
              subTitle='Tambah Data Kabupaten' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kabupaten'>Kabupaten</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form
          onSubmit={createKabupaten}
          successMessage='Sukses menambahkan kabupaten'
          provinsiOptions={provinsiOptions}
          isLoading={isLoading}
        />
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.kabupaten.isLoading,
  hasPrivilege: hasPrivilege(state),
  provinsiOptions: state.options.provinsi
})

export default connect(mapStateToProps, { createKabupaten, fetchProvinsiOptions })(KabupatenAdd)
