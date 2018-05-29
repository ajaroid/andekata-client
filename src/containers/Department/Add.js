import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createDepartment } from '../../actions/department'
import DepartmentForm from './DepartmentForm'
import { HeaderTitle } from 'components/common'

let DepartmentAdd = ({ hasPrivilege, isLoading, createDepartment }) => {
  if (!hasPrivilege('dept-store')) {
    return (
      <Redirect to='/forbidden/tambah-departemen' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='building outline'
            title='Departemen'
            subTitle='Tambah Data Departemen' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/department'>Department</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <DepartmentForm onSubmit={createDepartment} successMessage='Sukses menambahkan department' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.department.isLoading
})

export default connect(mapStateToProps, { createDepartment })(DepartmentAdd)
