import React from 'react'
import { Header, Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/auth'
import LoginForm from './LoginForm'

const LoginPage = ({ isLoggedIn, login, ...props }) => {
  return isLoggedIn ? (
    <Redirect to='/' />
  ) : (
    <Grid as={Container} verticalAlign='middle' centered className='app-login'>
      <Grid.Column computer={6} mobile={16}>
        <Header as='h2' color='teal' textAlign='center'>LOGIN</Header>
        <LoginForm onSubmit={login} {...props} />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { login })(LoginPage)
