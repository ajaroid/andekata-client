import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createUser } from '../../actions/user'
import Form from './Form'
import { HeaderTitle } from 'components/common'
import { fetchOptions as fetchEmployeeOptions } from '../../reducers/options/employee'

class UserAdd extends React.Component {
  componentWillMount () {
    const { fetchEmployeeOptions } = this.props

    fetchEmployeeOptions()
  }
  render () {
    const { hasPrivilege, isLoading, createUser, employeeOptions } = this.props
    if (!hasPrivilege('user-store')) {
      return (
        <Redirect to='/forbidden/tambah-user' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='user'
              title='User'
              subTitle='Tambah Data User' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/user'>Pengguna</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form
          employeeOptions={employeeOptions}
          onSubmit={createUser}
          successMessage='Sukses menambahkan pengguna'
          isLoading={isLoading}
        />
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  employeeOptions: state.options.employee,
  hasPrivilege: hasPrivilege(state)
})

export default connect(mapStateToProps, { createUser, fetchEmployeeOptions })(UserAdd)
