import React from 'react'
import { connect } from 'react-redux'
import { Form, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { Selection } from '../Form'
import { fetchOptions as fetchPendudukOptions } from '../../reducers/options/penduduk'
import { fetchOptions as fetchShkOptions } from '../../reducers/options/shk'

class FormClass extends React.Component {
  componentWillMount () {
    this.props.fetchShkOptions()
    this.props.fetchPendudukOptions()
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
      kk,
      shkOptions,
      pendudukOptions
    } = this.props
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message success icon='check circle' visible={submitSucceeded} content={successMessage} />
        <Message error icon='exclamation circle' visible={!!error} header='Error' content={error} />
        <Dimmer active={isLoading} inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Selection
          defaultValue={initialValues ? initialValues.penduduk_id : null}
          label='Penduduk'
          name='penduduk_id'
          loading={pendudukOptions.isLoading}
          options={pendudukOptions.options}
        />
        <Selection
          defaultValue={initialValues ? initialValues.status_hubungan_keluarga_id : null}
          label='Status Hubungan Keluarga'
          name='status_hubungan_keluarga_id'
          loading={shkOptions.isLoading}
          options={shkOptions.options}
        />
        <Form.Group inline>
          <Form.Button color='teal' icon='save' content='Submit' />
          <Link to={`/kk/${kk.id}`}>Kembali</Link>
        </Form.Group>
      </Form>
    )
  }
}

const validate = combineValidators({
  kk_id: composeValidators(isRequired)('Status'),
  penduduk_id: composeValidators(isRequired)('Penduduk'),
  status_hubungan_keluarga_id: composeValidators(isRequired)('Status Hubungan Keluarga')
})

const _Form = reduxForm({
  form: 'kkdetail',
  validate
})(FormClass)

const mapStateToProps = state => ({
  pendudukOptions: state.options.penduduk,
  shkOptions: state.options.shk
})

export default connect(mapStateToProps, { fetchPendudukOptions, fetchShkOptions })(_Form)
