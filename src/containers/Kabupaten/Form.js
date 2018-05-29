import React from 'react'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection } from 'components/Form'

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
      provinsiOptions
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Field label='Nama' name='name' />
        <Field label='Kode' name='code' />
        <Selection
          defaultValue={initialValues ? initialValues.provincy_id : null}
          icon='search'
          label='Provinsi'
          name='provincy_id'
          loading={provinsiOptions.isLoading}
          options={provinsiOptions.options}
        />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/kabupaten'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  name: composeValidators(isRequired('Nama kabupaten'))(),
  code: composeValidators(isRequired('Kode kabupaten'))(),
  provincy_id: composeValidators(isRequired('Provinsi'))()
})

export default reduxForm({
  form: 'regency',
  validate
})(FormClass)
