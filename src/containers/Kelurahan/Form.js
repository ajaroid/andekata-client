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
    searchKecamatan,
    kecamatanOptions
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
        placeholder='Cari kecamatan'
        defaultValue={initialValues ? initialValues.subdistrict_id : null}
        icon='search'
        onSearchChange={searchKecamatan}
        label='Kecamatan'
        name='subdistrict_id'
        loading={kecamatanOptions.isLoading}
        options={kecamatanOptions.options}
      />
      <Form.Group inline>
        <Form.Button color='teal' icon='save' content='Simpan' />
        <Link to='/kelurahan'>Kembali</Link>
      </Form.Group>
    </Form>
  )
}

const validate = combineValidators({
  name: composeValidators(isRequired('Nama kelurahan'))(),
  code: composeValidators(isRequired('Kode kelurahan'))(),
  subdistrict_id: composeValidators(isRequired('Kecamatan'))()
})

export default reduxForm({
  form: 'village',
  validate
})(FormClass)
