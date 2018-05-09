import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteDepartment, fetchDepartmentDetail } from '../../actions/department'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class DepartmentDetail extends React.Component {
  componentWillMount () {
    const { id, fetchDepartmentDetail } = this.props
    fetchDepartmentDetail(id)
  }
  render () {
    const { hasPrivilege, dept, history, deleteDepartment, isLoading } = this.props
    const deleteItem = () => {
      deleteDepartment({ id: dept.id }).then(() => {
        history.push('/department')
      })
    }

    if (!hasPrivilege('dept-show')) {
      return (
        <Redirect to='/forbidden/detail-departemen' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='building outline'
              title='Departemen'
              subTitle='Detail Data Departemen' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/department'>Departmen</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{dept.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('dept-update') ? <Button as={Link} to={`/department/edit/${dept.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('dept-destroy') ? <DeleteModal label='department' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            <Link to='/department'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{dept.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{dept.name}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  hasPrivilege: hasPrivilege(state),
  isLoading: state.department.isLoading,
  dept: state.department.detail
})

export default connect(mapStateToProps, { deleteDepartment, fetchDepartmentDetail })(DepartmentDetail)
