import React from 'react'
import is from 'is_js'
import { connect } from 'react-redux'
import { Divider, Grid, Form, Dimmer, Loader, Message } from 'semantic-ui-react'
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
      agamaOptions,
      pekerjaanOptions,
      pendidikanOptions,
      // pendudukOptions,
      shkOptions,
      statusKawinOptions,
      kelurahanOptions,
      searchKelurahan,
      isRegularUser
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Grid columns={2}>
          <Grid.Column>
            <Selection
              placeholder='Cari kelurahan'
              defaultValue={initialValues ? initialValues.village_id : null}
              disabled={isRegularUser}
              onSearchChange={searchKelurahan}
              label='Kelurahan'
              name='village_id'
              loading={kelurahanOptions.isLoading}
              options={kelurahanOptions.options}
            />
            <Field label='Nama' name='name' />
            <Field label='NIK' name='nik' />
            <Selection
              defaultValue={initialValues ? initialValues.gender : null}
              label='Jenis Kelamin'
              name='gender'
              options={[
                {
                  text: 'Laki-laki',
                  value: 'M'
                },
                {
                  text: 'Perempuan',
                  value: 'F'
                }
              ]}
            />
            <Field label='Tempat Lahir' name='birth_place' />
            <Field label='Tanggal Lahir' name='birth_date' type='date' />
            <Selection
              defaultValue={initialValues ? initialValues.religion_id : null}
              label='Agama'
              name='religion_id'
              loading={agamaOptions.isLoading}
              options={agamaOptions.options}
            />
            <Selection
              defaultValue={initialValues ? initialValues.education_id : null}
              label='Pendidikan'
              name='education_id'
              loading={pendidikanOptions.isLoading}
              options={pendidikanOptions.options}
            />
            <Selection
              defaultValue={initialValues ? initialValues.job_id : null}
              label='Pekerjaan'
              name='job_id'
              loading={pekerjaanOptions.isLoading}
              options={pekerjaanOptions.options}
            />
          </Grid.Column>
          <Grid.Column>
            <Selection
              defaultValue={initialValues ? initialValues.marital_status_id : null}
              label='Status Kawin'
              name='marital_status_id'
              loading={statusKawinOptions.isLoading}
              options={statusKawinOptions.options}
            />
            <Selection
              defaultValue={initialValues ? initialValues.status_hub_keluarga_id : null}
              label='Status Hubungan Keluarga'
              name='status_hub_keluarga_id'
              loading={shkOptions.isLoading}
              options={shkOptions.options}
            />
            <Selection
              defaultValue={initialValues ? initialValues.citizenship : null}
              label='Kewarganegaraan'
              name='citizenship'
              options={[
                {
                  text: 'WNI',
                  value: 'WNI'
                },
                {
                  text: 'WNA',
                  value: 'WNA'
                }
              ]}
            />
            <Field label='No. Paspor' name='passport_number' />
            <Field label='No. KITAS/KITAP' name='kitas_number' />
            <Field label='Nama Ayah' name='father_name' />
            <Field label='Nama Ibu' name='mother_name' />
            <Selection
              defaultValue={initialValues ? initialValues.blood_type : null}
              label='Gol. Darah'
              name='blood_type'
              options={[
                {
                  text: 'A',
                  value: 'A'
                },
                {
                  text: 'B',
                  value: 'B'
                },
                {
                  text: 'AB',
                  value: 'AB'
                },
                {
                  text: 'O',
                  value: 'O'
                }
              ]}
            />
            <Selection
              defaultValue={initialValues ? initialValues.status : null}
              label='Status'
              name='status'
              options={[
                {
                  text: 'Aktif',
                  value: 'active'
                },
                {
                  text: 'Pindah',
                  value: 'move'
                },
                {
                  text: 'Meninggal',
                  value: 'died'
                }
              ]}
            />
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/penduduk'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

// TODO proper validation
const validate = combineValidators({
  village_id: composeValidators(isRequired)('Kelurahan'),
  nik: composeValidators(isRequired)('NIK'),
  name: composeValidators(isRequired)('Nama'),
  gender: composeValidators(isRequired)('Jenis Kelamin'),
  birth_place: composeValidators(isRequired)('Tempat Lahir'),
  birth_date: composeValidators(isRequired)('Tanggal Lahir'),
  // golongan_darah: composeValidators(isRequired)('Gol. Darah'),
  father_name: composeValidators(isRequired)('Nama Ayah'),
  mother_name: composeValidators(isRequired)('Nama Ibu'),
  citizenship: composeValidators(isRequired)('Kewarganegaraan'),
  // no_paspor: composeValidators(isRequired)('No. Paspor'),
  // no_kitas: composeValidators(isRequired)('No. Kitas'),
  status: composeValidators(isRequired)('Status'),
  marital_status_id: composeValidators(isRequired)('Status Kawin'),
  status_hub_keluarga_id: composeValidators(isRequired)('Status Hubungan Keluarga'),
  job_id: composeValidators(isRequired)('Pekerjaan'),
  education_id: composeValidators(isRequired)('Pendidikan'),
  // penduduk_ayah_id: composeValidators(isRequired)('Ayah'),
  // penduduk_ibu_id: composeValidators(isRequired)('Ibu'),
  religion_id: composeValidators(isRequired)('Agama')
})

const _Form = reduxForm({
  form: 'resident',
  validate
})(FormClass)

const mapStateToProps = state => ({
  isSuperadmin: is.not.existy(state.auth.user.employee)
})

export default connect(mapStateToProps)(_Form)
