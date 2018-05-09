import React from 'react'
import { Form, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthLessThan
} from 'revalidate'
import { Selection, Field } from '../Form'

class FormClass extends React.Component {
  render () {
    const {
      error,
      onSubmit,
      handleSubmit,
      submitSucceeded,
      successMessage,
      initialValues,
      kelurahanOptions,
      isRegularUser
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Selection
          placeholder='Cari kelurahan'
          defaultValue={initialValues ? initialValues.village_id : null}
          onSearchChange={this.searchKelurahan}
          disabled={isRegularUser}
          label='Kelurahan'
          name='village_id'
          loading={kelurahanOptions.isLoading}
          options={kelurahanOptions.options}
        />
        <Field label='Keperluan' name='nama' />
        <Field label='Kode Pelayanan' name='kode_pelayanan' />
        <Field label='Kode Surat' name='kode_surat' />
        <Selection
          defaultValue={initialValues ? initialValues.tipe : null}
          label='Tipe'
          name='tipe'
          options={[
            {
              text: 'Surat Keterangan',
              value: 2
            },
            {
              text: 'Surat Pengantar',
              value: 1
            }
          ]}
        />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/keperluan-surat'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  nama: composeValidators(isRequired)('Nama'),
  kode_pelayanan: composeValidators(hasLengthLessThan(11), isRequired)('Kode Pelayanan'),
  kode_surat: composeValidators(hasLengthLessThan(11), isRequired)('Kode Surat'),
  tipe: composeValidators(isRequired)('Tipe'),
  village_id: composeValidators(isRequired)('Kelurahan')
})

export default reduxForm({
  form: 'keperluanSurat',
  validate
})(FormClass)
