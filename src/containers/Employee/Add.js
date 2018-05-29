import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createEmployee } from '../../actions/employee'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { fetchOptions as fetchPositionOptions } from '../../reducers/options/position'
import { fetchOptions as fetchStatusKawinOptions } from '../../reducers/options/statusKawin'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import debounce from 'lodash.debounce'

class EmployeeAdd extends React.Component {
  constructor () {
    super()
    this.searchKelurahan = debounce(this.searchKelurahan, 500).bind(this)
  }
  componentWillMount () {
    const { fetchPositionOptions, fetchStatusKawinOptions } = this.props

    fetchPositionOptions()
    fetchStatusKawinOptions()
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
      createEmployee,
      statusKawinOptions,
      kelurahanOptions,
      positionOptions
    } = this.props
    if (!hasPrivilege('employee-store')) {
      return (
        <Redirect to='/forbidden/tambah-karyawan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='suitcase'
              title='Karyawan'
              subTitle='Tambah Data Karyawan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/employee'>Karyawan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          onSubmit={createEmployee}
          successMessage='Sukses menambahkan employee'
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

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.employee.isLoading,
  positionOptions: state.options.position,
  statusKawinOptions: state.options.statusKawin,
  kelurahanOptions: state.options.kelurahan
})

export default connect(mapStateToProps, {
  createEmployee,
  fetchPositionOptions,
  fetchStatusKawinOptions,
  fetchKelurahanOptions
})(EmployeeAdd)
