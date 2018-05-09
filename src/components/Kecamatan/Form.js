import React from 'react'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection } from '../Form'

const FormClass = (props) => {
  const {
    isLoading,
    error,
    onSubmit,
    handleSubmit,
    submitSucceeded,
    successMessage,
    initialValues,
    searchKabupaten,
    kabupatenOptions
  } = props
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
        placeholder='Cari kabupaten'
        icon='search'
        onSearchChange={searchKabupaten}
        defaultValue={initialValues ? initialValues.regency_id : null}
        label='Kabupaten'
        name='regency_id'
        loading={kabupatenOptions.isLoading}
        options={kabupatenOptions.options}
      />
      <Form.Group inline>
        <Form.Button color='teal' icon='save' content='Simpan' />
        <Link to='/kecamatan'>Kembali</Link>
      </Form.Group>
    </Form>
  )
}

const validate = combineValidators({
  name: composeValidators(isRequired('Nama kecamatan'))(),
  code: composeValidators(isRequired('Kode kecamatan'))(),
  regency_id: composeValidators(isRequired('Kabupaten'))()
})

export default reduxForm({
  form: 'subdistrict',
  validate
})(FormClass)
