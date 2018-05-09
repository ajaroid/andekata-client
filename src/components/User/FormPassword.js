import React from 'react'
import { connect } from 'react-redux'
import { Divider, Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field } from '../Form'

class FormClass extends React.Component {
  render () {
    const {
      isLoading,
      error,
      onSubmit,
      handleSubmit,
      submitSucceeded,
      successMessage
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Field label='Password Lama' name='password' type='password' />
        <Divider hidden />
        <Field label='Password Baru' name='password_new' type='password' />
        <Field label='Ulangi Password Baru' name='password_new_confirmation' type='password' />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Submit' />
          <Link to='/user'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  password: composeValidators(isRequired('Password Lama'))(),
  password_new: composeValidators(isRequired('Password Baru'))(),
  password_new_confirmation: composeValidators(isRequired('Konfirmasi Password Baru'))()
})

const _Form = reduxForm({
  form: 'userPassword',
  validate
})(FormClass)

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(_Form)
