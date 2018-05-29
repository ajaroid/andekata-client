import React from 'react'
import { Header, Grid, Divider, Icon, Form, Dimmer, Loader, Message } from 'semantic-ui-react'
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
      keperluanSuratOptions,
      pekerjaanOptions,
      agamaOptions,
      kelurahanOptions,
      pendudukOptions,
      searchKelurahan,
      searchPenduduk,
      onChangePenduduk
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header textAlign='center'>SURAT KETERANGAN</Header>
        <Divider />
        <Divider hidden />
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
        <Grid>
          <Grid.Column width={16}>
            <Selection
              placeholder='Cari kelurahan'
              icon='search'
              defaultValue={initialValues ? initialValues.village_id : null}
              disabled={!!initialValues.village_id}
              onSearchChange={searchKelurahan}
              label='Kelurahan'
              name='village_id'
              loading={kelurahanOptions.isLoading}
              options={kelurahanOptions.options}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Message>Yang bertanda tangan di bawah ini, menerangkan bahwa:</Message>
          </Grid.Column>
          <Grid.Column width={16}>
            <Field style={{display: 'none'}} label='Nama' name='nama' />
            <Selection
              placeholder='Cari penduduk'
              icon='search'
              onSearchChange={searchPenduduk}
              onChange={onChangePenduduk}
              label='Nama'
              name='pid'
              loading={pendudukOptions.isLoading}
              options={pendudukOptions.options}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field label='Tempat Lahir' name='tempat_lahir' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field label='Tanggal Lahir' name='tanggal_lahir' type='date' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Selection
              defaultValue={initialValues ? initialValues.kewarganegaraan : null}
              label='Kewarganegaraan'
              name='kewarganegaraan'
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
          </Grid.Column>
          <Grid.Column width={8}>
            <Selection
              defaultValue={initialValues ? initialValues.religion_id : null}
              label='Agama'
              name='religion_id'
              loading={agamaOptions.isLoading}
              options={agamaOptions.options}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Selection
              defaultValue={initialValues ? initialValues.job_id : null}
              label='Pekerjaan'
              name='job_id'
              loading={pekerjaanOptions.isLoading}
              options={pekerjaanOptions.options}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Field label='Alamat' name='alamat' />
          </Grid.Column>
          <Grid.Column width={3}>
            <Field label='RT' name='rt' />
          </Grid.Column>
          <Grid.Column width={3}>
            <Field label='RW' name='rw' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field label='NIK' name='nik' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field label='No. KK' name='no_kk' />
          </Grid.Column>
          <Grid.Column width={16}>
            <Selection
              defaultValue={initialValues ? initialValues.keperluan_surat_id : null}
              label='Keperluan Surat'
              name='keperluan_surat_id'
              loading={keperluanSuratOptions.isLoading}
              options={keperluanSuratOptions.options}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field label='Berlaku dari' name='tgl_berlaku_dari' type='date' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field label='Berlaku sampai' name='tgl_berlaku_sampai' type='date' />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field label='Keterangan lain-lain' name='keterangan' />
          </Grid.Column>
          <Grid.Column width={16}>
            <Message>Demikian untuk menjadikan maklum bagi yang berkepentingan</Message>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/surat-keterangan'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  village_id: composeValidators(isRequired)('Kelurahan'),
  keperluan_surat_id: composeValidators(isRequired)('Keperluan Surat'),
  job_id: composeValidators(isRequired)('Pekerjaan'),
  religion_id: composeValidators(isRequired)('Agama'),
  nama: composeValidators(isRequired)('Nama'),
  tempat_lahir: composeValidators(isRequired)('Tempat Lahir'),
  tanggal_lahir: composeValidators(isRequired)('Tanggal Lahir'),
  kewarganegaraan: composeValidators(isRequired)('Kewarganegaraan'),
  alamat: composeValidators(isRequired)('Alamat'),
  rt: composeValidators(isRequired)('RT'),
  rw: composeValidators(isRequired)('RW'),
  no_kk: composeValidators(isRequired)('Nomor KK'),
  nik: composeValidators(isRequired)('NIK'),
  tgl_berlaku_dari: composeValidators(isRequired)('Berlaku Dari'),
  tgl_berlaku_sampai: composeValidators(isRequired)('Berlaku Sampai')
  // keterangan: composeValidators(isRequired)('Keterangan'),
})

export default reduxForm({
  form: 'suratKeterangan',
  validate
})(FormClass)
