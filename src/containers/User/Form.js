import React from 'react'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { isEmail, Field, Selection } from '../Form'

class FormClass extends React.Component {
  render () {
    const {
      isLoading,
      error,
      onSubmit,
      handleSubmit,
      submitSucceeded,
      successMessage,
      employeeOptions,
      initialValues
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Field label='Username' name='username' />
        <Field label='Email' name='email' type='email' />
        {!initialValues && <Field label='Password' name='password' type='password' />}
        <Selection
          defaultValue={initialValues ? initialValues.employee_id : null}
          icon='search'
          label='Karyawan'
          name='employee_id'
          loading={employeeOptions.isLoading}
          options={employeeOptions.options}
        />
        {
          initialValues && <Selection
            defaultValue={initialValues ? initialValues.status : null}
            label='Status'
            name='status'
            options={[
              {
                text: 'Pending',
                value: 0
              },
              {
                text: 'Aktif',
                value: 1
              },
              {
                text: 'Nonaktif',
                value: 2
              }
            ]}
          />
        }
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/user'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  username: composeValidators(isRequired('Username'))(),
  email: composeValidators(isRequired('Email'), isEmail)(),
  password: composeValidators(isRequired('Password'))()
})

export default reduxForm({
  form: 'user',
  validate
})(FormClass)
