import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateDepartment, fetchDepartmentDetail } from '../../actions/department'
import DepartmentForm from './DepartmentForm'
import { Loader, HeaderTitle } from 'components/common'

class DepartmentEdit extends React.Component {
  componentWillMount () {
    const { id, fetchDepartmentDetail } = this.props
    fetchDepartmentDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateDepartment, initialValues } = this.props
    if (!hasPrivilege('dept-update')) {
      return (
        <Redirect to='/forbidden/edit-departemen' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='building outline'
              title='Departemen'
              subTitle='Ubah Data Departemen' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/department'>Department</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <DepartmentForm initialValues={initialValues} onSubmit={updateDepartment} successMessage='Departemen sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  hasPrivilege: hasPrivilege(state),
  isLoading: state.department.isLoading,
  initialValues: state.department.detail
})

export default connect(mapStateToProps, { updateDepartment, fetchDepartmentDetail })(DepartmentEdit)
