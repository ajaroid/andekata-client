import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { resetPassword } from '../../actions/user'
import Form from './Form'
import { HeaderTitle } from 'components/common'

const ResetPassword = (props) => {
  const { isLoading, initialValues, resetPassword } = props
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='privacy'
            title='Reset Password'
            subTitle='Ubah Password Saya' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Reset Password</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form initialValues={initialValues} onSubmit={resetPassword} successMessage='Sukses reset password' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = (state, { match }) => ({
  isLoading: state.user.isLoading,
  initialValues: {
    id: state.auth.user.id
  }
})

export default connect(mapStateToProps, { resetPassword })(ResetPassword)
