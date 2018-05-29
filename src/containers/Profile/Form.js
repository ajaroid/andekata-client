import React from 'react'
import { connect } from 'react-redux'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { reduxForm, change as changeVal } from 'redux-form'
import { uploadPhoto } from '../../actions/employee'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection, isEmail, FileInput } from 'components/Form'
import { fetchOptions as fetchPositionOptions } from '../../reducers/options/position'
import { fetchOptions as fetchStatusKawinOptions } from '../../reducers/options/statusKawin'

class FormClass extends React.Component {
  constructor () {
    super()
    this.handleChangePhoto = this.handleChangePhoto.bind(this)
  }
  componentWillMount () {
    const { fetchPositionOptions, fetchStatusKawinOptions } = this.props

    fetchPositionOptions()
    fetchStatusKawinOptions()
  }
  handleChangePhoto (e) {
    const { changeVal, uploadPhoto } = this.props

    if (e.target.files.length <= 0) {
      return
    }

    const logo = e.target.files[0]
    uploadPhoto(logo).then(response => {
      changeVal('employee', 'photo', response.url)
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
      // positionOptions,
      statusKawinOptions
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        {/* <Field label='Kode' name='code' /> */}
        <Field label='Nama' name='name' />
        <Field label='Kota' name='city' />
        <Field label='Alamat' name='address' />
        <Field label='Tanggal Lahir' name='birth_date' type='date' />
        <Field label='Kota Lahir' name='birth_city' />
        <Selection
          defaultValue={initialValues ? initialValues.gender : null}
          label='Jenis Kelamin'
          name='gender'
          options={[
            {
              text: 'Laki-laki',
              value: 'L'
            },
            {
              text: 'Perempuan',
              value: 'P'
            }
          ]}
        />
        <Selection
          defaultValue={initialValues ? initialValues.marital_status_id : null}
          label='Status Kawin'
          name='marital_status_id'
          loading={statusKawinOptions.isLoading}
          options={statusKawinOptions.options}
        />
        {/* <Selection
          defaultValue={initialValues ? initialValues.job_status : null}
          label='Status Kerja'
          name='job_status'
          options={[
            {
              text: 'Kontrak',
              value: 0
            },
            {
              text: 'Tetap',
              value: 1
            }
          ]}
        /> */}
        <Field label='Nomor Telepon' name='phone_number' />
        <Field label='Email' name='email' type='email' />
        {/* <Selection
          defaultValue={initialValues ? initialValues.position_id : null}
          label='Posisi / Jabatan'
          name='position_id'
          loading={positionOptions.isLoading}
          options={positionOptions.options}
        /> */}
        {/* <Selection
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
        /> */}
        <FileInput label='Foto' name='photo' accept='.jpeg, .jpg, .png, .gif, .bmp' onChange={this.handleChangePhoto} />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  // code: composeValidators(isRequired)('Kode'),
  name: composeValidators(isRequired)('Nama'),
  city: composeValidators(isRequired)('Kota'),
  address: composeValidators(isRequired)('Alamat'),
  birth_date: composeValidators(isRequired)('Tanggal Lahir'),
  birth_city: composeValidators(isRequired)('Kota Lahir'),
  gender: composeValidators(isRequired)('Jenis Kelamin'),
  marital_status_id: composeValidators(isRequired)('Status Kawin'),
  // job_status: composeValidators(isRequired)('Status Kerja'),
  phone_number: composeValidators(isRequired)('Nomor Telepon'),
  // position_id: composeValidators(isRequired)('Posisi'),
  // status: composeValidators(isRequired)('Status'),
  email: composeValidators(isRequired, isEmail)('Email')
})

const _Form = reduxForm({
  form: 'employee',
  validate
})(FormClass)

const mapStateToProps = state => ({
  positionOptions: state.options.position,
  statusKawinOptions: state.options.statusKawin
})

export default connect(mapStateToProps, { uploadPhoto, fetchPositionOptions, fetchStatusKawinOptions, changeVal })(_Form)
