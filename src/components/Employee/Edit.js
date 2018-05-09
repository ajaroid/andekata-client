import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateEmployee, fetchEmployeeDetail } from '../../actions/employee'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'
import { fetchOptions as fetchPositionOptions } from '../../reducers/options/position'
import { fetchOptions as fetchStatusKawinOptions } from '../../reducers/options/statusKawin'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'

class EmployeeEdit extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
  }
  componentWillMount () {
    const { id, fetchEmployeeDetail, fetchPositionOptions, fetchStatusKawinOptions, fetchKelurahanOptions } = this.props
    fetchEmployeeDetail(id).then(response => {
      fetchPositionOptions()
      fetchStatusKawinOptions()
      if (response.village_id) {
        fetchKelurahanOptions({ q: response.village.name })
      }
    })
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  render () {
    const {
      hasPrivilege,
      isLoading,
      updateEmployee,
      initialValues,
      statusKawinOptions,
      kelurahanOptions,
      positionOptions
    } = this.props
    if (!hasPrivilege('employee-update')) {
      return (
        <Redirect to='/forbidden/edit-karyawan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='suitcase'
              title='Karyawan'
              subTitle='Edit Data Karyawan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/employee'>Karyawan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Ubah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          initialValues={initialValues}
          onSubmit={updateEmployee}
          successMessage='Karyawan sukses diubah'
          isLoading={isLoading}
          searchKelurahan={this.searchKelurahan}
          statusKawinOptions={statusKawinOptions}
          positionOptions={positionOptions}
          kelurahanOptions={kelurahanOptions}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.employee.isLoading,
    initialValues: state.employee.detail,
    positionOptions: state.options.position,
    statusKawinOptions: state.options.statusKawin,
    kelurahanOptions: state.options.kelurahan
  }
}

export default connect(mapStateToProps, {
  updateEmployee,
  fetchEmployeeDetail,
  fetchPositionOptions,
  fetchStatusKawinOptions,
  fetchKelurahanOptions
})(EmployeeEdit)
