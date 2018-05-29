import React from 'react'
import { connect } from 'react-redux'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection } from 'components/Form'
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
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Field label='Nama' name='nama' />
        <Selection
          placeholder='Cari kelurahan'
          defaultValue={initialValues ? initialValues.kelurahan_id : null}
          onSearchChange={this.searchKelurahan}
          label='Kelurahan'
          name='kelurahan_id'
          loading={kelurahanOptions.isLoading}
          options={kelurahanOptions.options}
        />
        <Field label='No KK' name='no_kk' />
        <Field label='Alamat' name='alamat' />
        <Field label='RT' name='rt' />
        <Field label='RW' name='rw' />
        <Field label='Kode Pos' name='kode_pos' />
        <Selection
          defaultValue={initialValues ? initialValues.status : null}
          label='Status'
          name='status'
          options={[
            {
              text: 'Nonaktif',
              value: 0
            },
            {
              text: 'Aktif',
              value: 1
            }
          ]}
        />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/kk'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  nama: composeValidators(isRequired('Nama'))(),
  kelurahan_id: composeValidators(isRequired('Kelurahan'))(),
  no_kk: composeValidators(isRequired('Nomor KK'))(),
  alamat: composeValidators(isRequired('Alamat'))(),
  rt: composeValidators(isRequired('RT'))(),
  rw: composeValidators(isRequired('RW'))(),
  kode_pos: composeValidators(isRequired('Kode Pos'))(),
  status: composeValidators(isRequired('Status'))()
})

const _Form = reduxForm({
  form: 'kk',
  validate
})(FormClass)

const mapStateToProps = state => ({
  kelurahanOptions: state.options.kelurahan
})

export default connect(mapStateToProps, { fetchKelurahanOptions })(_Form)
