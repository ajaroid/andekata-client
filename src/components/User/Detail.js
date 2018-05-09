import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteUser, fetchUserDetail } from '../../actions/user'
import DeleteModal from '../common/DeleteModal'
import { StatusLabel } from './List'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class UserDetail extends React.Component {
  componentWillMount () {
    const { id, fetchUserDetail } = this.props
    fetchUserDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, user, history, deleteUser } = this.props
    const deleteItem = () => {
      deleteUser({ id: user.id }).then(() => {
        history.push('/user')
      })
    }

    if (!hasPrivilege('user-show')) {
      return (
        <Redirect to='/forbidden/detail-user' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='user'
              title='Pengguna'
              subTitle='Detail Data Pengguna' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/user'>Pengguna</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{user.username}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('user-update') && <Button as={Link} to={`/user/edit/${user.id}`} color='teal' icon='pencil' content='Edit' />}
            {hasPrivilege('user-destroy') && <DeleteModal label='user' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} />}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/user'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Username</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Email</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
            {user.employee_id && <Table.Row>
              <Table.Cell collapsing>Data Diri</Table.Cell>
              <Table.Cell><Link to={`/employee/${user.employee_id}`}>Lihat detail</Link></Table.Cell>
            </Table.Row>}
            <Table.Row>
              <Table.Cell collapsing>Status</Table.Cell>
              <Table.Cell><StatusLabel status={user.status} /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    hasPrivilege: hasPrivilege(state),
    id: match.params.id,
    isLoading: state.user.isLoading,
    user: state.user.detail
  }
}

export default connect(mapStateToProps, { deleteUser, fetchUserDetail })(UserDetail)
