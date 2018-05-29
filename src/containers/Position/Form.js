import React from 'react'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection } from '../Form'

class FormClass extends React.Component {
  render () {
    const {
      isLoading,
      error,
      onSubmit,
      handleSubmit,
      submitSucceeded,
      successMessage,
      initialValues,
      deptOptions
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Field label='Nama Jabatan' name='name' />
        <Field label='Kode' name='code' />
        <Selection
          defaultValue={initialValues ? initialValues.dept_id : null}
          label='Departmen'
          name='dept_id'
          loading={deptOptions.isLoading}
          options={deptOptions.options}
        />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/position'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  name: composeValidators(isRequired('Nama Jabatan'))(),
  code: composeValidators(isRequired('Kode posisi'))(),
  dept_id: composeValidators(isRequired('Departmen'))()
})

export default reduxForm({
  form: 'position',
  validate
})(FormClass)
