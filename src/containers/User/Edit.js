import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateUser, fetchUserDetail } from '../../actions/user'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { fetchOptions as fetchEmployeeOptions } from '../../reducers/options/employee'

class UserEdit extends React.Component {
  componentWillMount () {
    const { id, fetchUserDetail, fetchEmployeeOptions } = this.props
    fetchUserDetail(id).then(response => {
      fetchEmployeeOptions()
    })
  }
  render () {
    const { hasPrivilege, isLoading, updateUser, initialValues, employeeOptions } = this.props
    if (!hasPrivilege('user-update')) {
      return (
        <Redirect to='/forbidden/edit-user' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='user'
              title='Pengguna'
              subTitle='Ubah Data Pengguna' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/user'>Pengguna</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Ubah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form employeeOptions={employeeOptions} initialValues={initialValues} onSubmit={updateUser} successMessage='Pengguna sukses diubah' isLoading={isLoading} />}
      </Segment>

    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  hasPrivilege: hasPrivilege(state),
  isLoading: state.user.isLoading,
  employeeOptions: state.options.employee,
  initialValues: state.user.detail
})

export default connect(mapStateToProps, { updateUser, fetchUserDetail, fetchEmployeeOptions })(UserEdit)
