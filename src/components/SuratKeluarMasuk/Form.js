import React from 'react'
import { connect } from 'react-redux'
import { Icon, Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection } from '../Form'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'

class FormClass extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  render () {
    const {
      isLoading,
      error,
      onSubmit,
      handleSubmit,
      submitSucceeded,
      successMessage,
      initialValues,
      kelurahanOptions
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message success icon visible={submitSucceeded}>
          <Icon name='check circle' />
          <Message.Content>
            {successMessage} &nbsp;&nbsp;
          </Message.Content>
        </Message>
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Selection
          placeholder='Cari kelurahan'
          defaultValue={initialValues ? initialValues.kelurahan_id : null}
          onSearchChange={this.searchKelurahan}
          label='Kelurahan'
          name='kelurahan_id'
          loading={kelurahanOptions.isLoading}
          options={kelurahanOptions.options}
        />
        <Field label='Nomor' name='no' />
        <Field label='Dari' name='dari' />
        <Field label='Kepada' name='kepada' />
        <Field label='Tanggal' name='tanggal' type='date' />
        <Field label='Keterangan' name='keterangan' />
        <Selection
          defaultValue={initialValues ? initialValues.jenis : null}
          label='Jenis Surat'
          name='jenis'
          options={[
            {
              text: 'Surat Masuk',
              value: 1
            },
            {
              text: 'Surat Keluar',
              value: 0
            }
          ]}
        />
        <Field label='Isi surat' name='isi' />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/surat-keluar-masuk'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  kelurahan_id: composeValidators(isRequired)('Kelurahan'),
  no: composeValidators(isRequired)('Nomor'),
  dari: composeValidators(isRequired)('Dari'),
  kepada: composeValidators(isRequired)('Kepada'),
  tanggal: composeValidators(isRequired)('Tanggal'),
  keterangan: composeValidators(isRequired)('Keterangan'),
  jenis: composeValidators(isRequired)('Jenis'),
  isi: composeValidators(isRequired)('Isi surat')
})

const _Form = reduxForm({
  form: 'suratKeluarMasuk',
  validate
})(FormClass)

const mapStateToProps = state => ({
  kelurahanOptions: state.options.kelurahan
})

export default connect(mapStateToProps, { fetchKelurahanOptions })(_Form)
