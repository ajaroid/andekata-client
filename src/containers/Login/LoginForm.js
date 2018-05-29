import React from 'react'
import { Message, Segment, Form, Dimmer, Loader } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, isEmail } from '../Form'

let LoginForm = ({ error, handleSubmit, isLoading }) => {
  return (
    <Form className='attached' onSubmit={handleSubmit}>
      <Dimmer active={isLoading} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>
      <Message icon='exclamation circle' visible={!!error} header='Error' content={error} error />
      <Segment attached stacked>
        <Field label='Email' name='email' />
        <Field label='Password' name='password' type='password' />
        <Form.Button color='teal'>Login</Form.Button>
      </Segment>
    </Form>
  )
}

// const required = isRequired({ message: 'Required' })

const validate = combineValidators({
  email: composeValidators(isRequired('Email'), isEmail)(),
  password: composeValidators(isRequired('Password'))()
})

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm)

export default LoginForm
