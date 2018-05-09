import React from 'react'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm, change as changeVal } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { FileInput, Field, Selection } from '../Form'
import { connect } from 'react-redux'
import { uploadLogo } from '../../actions/desa'

class FormClass extends React.Component {
  constructor () {
    super()
    this.handleChangeLogo = this.handleChangeLogo.bind(this)
  }
  handleChangeLogo (e) {
    const { changeVal, uploadLogo } = this.props

    if (e.target.files.length <= 0) {
      return
    }

    const logo = e.target.files[0]
    uploadLogo(logo).then(response => {
      changeVal('desa', 'logo', response.url)
    }).catch(err => {
      console.log('upload err', err)
    })
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
      kelurahanOptions,
      searchKelurahan
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Selection
          placeholder='Cari kelurahan'
          icon='search'
          defaultValue={initialValues ? initialValues.village_id : null}
          onSearchChange={searchKelurahan}
          label='Kelurahan'
          name='village_id'
          loading={kelurahanOptions.isLoading}
          options={kelurahanOptions.options}
        />
        <Field label='Nama Kepala Desa' name='headman_name' />
        <Field label='NIP Kepala Desa' name='headman_nip' />
        <Field label='Nama Kepala Camat' name='head_subdistrict_name' />
        <Field label='NIP Kepala Camat' name='head_subdistrict_nip' />
        <Field label='Nama Bupati' name='regent_name' />
        <Field label='Alamat Balai Desa' name='address' />
        <Field label='No. Telepon' name='phone' />
        <Field label='Website' name='website' />
        <Field label='Email' name='email' />
        <FileInput label='Logo' name='logo' accept='.jpeg, .jpg, .png, .gif, .bmp' onChange={this.handleChangeLogo} />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/desa'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  village_id: composeValidators(isRequired('Kelurahan'))(),
  headman_name: composeValidators(isRequired('Nama Kepala Desa'))(),
  headman_nip: composeValidators(isRequired('NIP Kepala Desa'))(),
  head_subdistrict_name: composeValidators(isRequired('Nama Kepala Camat'))(),
  head_subdistrict_nip: composeValidators(isRequired('NIP Kepala Camat'))(),
  regent_name: composeValidators(isRequired('Nama Bupati'))(),
  address: composeValidators(isRequired('Alamat Balai Desa'))(),
  phone: composeValidators(isRequired('No. Telepon'))(),
  website: composeValidators(isRequired('Website'))(),
  email: composeValidators(isRequired('Email'))(),
  logo: composeValidators(isRequired('Logo'))()
})

const _Form = reduxForm({
  form: 'desa',
  validate
})(FormClass)

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { changeVal, uploadLogo })(_Form)
