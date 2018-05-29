import React from 'react'
import { connect } from 'react-redux'
import { Divider, Grid, Icon, Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Field, Selection } from 'components/Form'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import { fetchOptions as fetchKkOptions } from '../../reducers/options/kk'
import { fetchOptions as fetchNikOptions } from '../../reducers/options/nik'
import { fetchOptions as fetchPekerjaanOptions } from '../../reducers/options/pekerjaan'
import { fetchOptions as fetchKeperluanSuratOptions } from '../../reducers/options/keperluanSurat'
import debounce from 'lodash.debounce'
import { fillPenduduk } from '../../actions/suratPelayanan'

class FormClass extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
    this.searchKk = debounce(this.searchKk, 500).bind(this)
    this.searchNik = debounce(this.searchNik, 500).bind(this)
    this.handleChangeNik = this.handleChangeNik.bind(this)
  }
  componentWillMount () {
    this.props.fetchKeperluanSuratOptions()
    this.props.fetchPekerjaanOptions()
  }
  handleChangeNik (e, data) {
    this.props.fillPenduduk(data)
  }
  searchNik (e, data) {
    const { fetchNikOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchNikOptions({ q: data.searchQuery })
  }
  searchKk (e, data) {
    const { fetchKkOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKkOptions({ q: data.searchQuery })
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
      kelurahanOptions,
      kkOptions,
      nikOptions,
      keperluanSuratOptions,
      pekerjaanOptions
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
        <Grid columns={2}>
          <Grid.Column>
            <Selection
              placeholder='Cari NIK'
              defaultValue={initialValues ? initialValues.nik : null}
              onSearchChange={this.searchNik}
              onChange={this.handleChangeNik}
              label='NIK'
              name='nik'
              loading={nikOptions.isLoading}
              options={nikOptions.options}
            />
            <Field label='Nama' name='nama' />
            <Field label='Tempat Lahir' name='tempat_lahir' />
            <Field label='Tanggal Lahir' name='tanggal_lahir' type='date' />
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
            <Field label='Alamat' name='alamat' />
            <Field label='RT' name='rt' />
            <Field label='RW' name='rw' />
          </Grid.Column>
          <Grid.Column>
            <Selection
              placeholder='Cari KK'
              defaultValue={initialValues ? initialValues.no_kk : null}
              onSearchChange={this.searchKk}
              label='Nomor KK'
              name='no_kk'
              loading={kkOptions.isLoading}
              options={kkOptions.options}
            />
            <Selection
              placeholder='Cari kelurahan'
              defaultValue={initialValues ? initialValues.kelurahan_id : null}
              onSearchChange={this.searchKelurahan}
              label='Kelurahan'
              name='kelurahan_id'
              loading={kelurahanOptions.isLoading}
              options={kelurahanOptions.options}
            />
            <Selection
              defaultValue={initialValues ? initialValues.keperluan_surat_id : null}
              label='Keperluan Surat'
              name='keperluan_surat_id'
              loading={keperluanSuratOptions.isLoading}
              options={keperluanSuratOptions.options}
            />
            <Selection
              defaultValue={initialValues ? initialValues.pekerjaan_id : null}
              label='Pekerjaan'
              name='pekerjaan_id'
              loading={pekerjaanOptions.isLoading}
              options={pekerjaanOptions.options}
            />
            <Field label='Keperluan' name='keperluan' />
            <Field label='Berlaku dari' name='tgl_berlaku_dari' type='date' />
            <Field label='Berlaku sampai' name='tgl_berlaku_sampai' type='date' />
            <Field label='Keterangan' name='keterangan' />
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Simpan' />
          <Link to='/surat-pelayanan'>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  // keperluan_surat_id: composeValidators(isRequired)('Keperluan Surat'),
  pekerjaan_id: composeValidators(isRequired)('Pekerjaan'),
  nama: composeValidators(isRequired)('Nama'),
  tempat_lahir: composeValidators(isRequired)('Tempat Lahir'),
  tanggal_lahir: composeValidators(isRequired)('Tanggal Lahir'),
  kewarganegaraan: composeValidators(isRequired)('Kewarganegaraan'),
  alamat: composeValidators(isRequired)('Alamat'),
  rt: composeValidators(isRequired)('RT'),
  rw: composeValidators(isRequired)('RW'),
  no_kk: composeValidators(isRequired)('Nomor KK'),
  nik: composeValidators(isRequired)('NIK'),
  keperluan: composeValidators(isRequired)('Keperluan'),
  tgl_berlaku_dari: composeValidators(isRequired)('Berlaku Dari'),
  tgl_berlaku_sampai: composeValidators(isRequired)('Berlaku Sampai'),
  // keterangan: composeValidators(isRequired)('Keterangan'),
  kelurahan_id: composeValidators(isRequired)('Kelurahan')
})

const _Form = reduxForm({
  form: 'suratPelayanan',
  validate
})(FormClass)

const mapStateToProps = state => ({
  kelurahanOptions: state.options.kelurahan,
  kkOptions: state.options.kk,
  nikOptions: state.options.nik,
  keperluanSuratOptions: state.options.keperluanSurat,
  pekerjaanOptions: state.options.pekerjaan
})

export default connect(mapStateToProps, {
  fetchKelurahanOptions,
  fetchKkOptions,
  fetchNikOptions,
  fetchKeperluanSuratOptions,
  fetchPekerjaanOptions,
  fillPenduduk
})(_Form)
