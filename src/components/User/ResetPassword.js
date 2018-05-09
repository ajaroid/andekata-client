import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { resetPassword } from '../../actions/user'
import FormPassword from './FormPassword'

const UserResetPassword = (props) => {
  const { isLoading, initialValues, resetPassword } = props
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <Header>Reset Password User</Header>
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/user'>Pengguna</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Reset Password Pengguna</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <FormPassword initialValues={initialValues} onSubmit={resetPassword} successMessage='Sukses reset password pengguna' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = (state, { match }) => ({
  isLoading: state.user.isLoading,
  initialValues: {
    id: match.params.id
  }
})

export default connect(mapStateToProps, { resetPassword })(UserResetPassword)
