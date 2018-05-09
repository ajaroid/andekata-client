import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createPosition } from '../../actions/position'
import Form from './Form'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchDeptOptions } from '../../reducers/options/department'

class PositionAdd extends React.Component {
  componentWillMount () {
    const { fetchDeptOptions } = this.props

    fetchDeptOptions()
  }
  render() {
    const { hasPrivilege, isLoading, createPosition, deptOptions } = this.props
    if (!hasPrivilege('position-store')) {
      return (
        <Redirect to='/forbidden/tambah-jabatan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='sitemap'
              title='Jabatan'
              subTitle='Tambah Data Jabatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/position'>Jabatan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form
          onSubmit={createPosition}
          successMessage='Sukses menambahkan position'
          deptOptions={deptOptions}
          isLoading={isLoading}
        />
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  deptOptions: state.options.department,
  isLoading: state.position.isLoading
})

export default connect(mapStateToProps, { createPosition, fetchDeptOptions })(PositionAdd)
