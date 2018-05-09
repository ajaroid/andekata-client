import React from 'react'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field } from '../Form'

let _Form = ({ isLoading, error, onSubmit, handleSubmit, submitSucceeded, successMessage }) => (
  <Form onSubmit={handleSubmit(onSubmit)}>
    <Dimmer active={isLoading} inverted>
      <Loader>Loading...</Loader>
    </Dimmer>
    <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
    <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
    <Field label='Nama' name='name' />
    <Form.Group inline>
      <Form.Button color='teal' icon='save' content='Simpan' />
      <Link to='/status-kawin'>Kembali</Link>
    </Form.Group>
  </Form>
)

const validate = combineValidators({
  name: composeValidators(isRequired('Status kawin'))()
})

_Form = reduxForm({
  form: 'maritalStatus',
  validate
})(_Form)

export default _Form
