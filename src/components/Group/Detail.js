import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Message, Dropdown, Table, Segment, Breadcrumb, Grid, Divider, Button, Header } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateGroupPrivilege, fetchGroupDetail, deleteGroup, updateGroupUsers, dismissError } from '../../actions/group'
import DeleteModal from '../common/DeleteModal'
import { fetchOptions as fetchUserOptions } from '../../reducers/options/user'
import { fetchPrivilege } from '../../actions/privilege'
import { mapObject } from '../../lib/helpers'
import HeaderTitle from '../common/HeaderTitle'

class GroupDetail extends React.Component {
  constructor () {
    super()
    this.handleChangeUsers = this.handleChangeUsers.bind(this)
    this.dismissError = this.dismissError.bind(this)
    this.renderPrivilege = this.renderPrivilege.bind(this)
    this.renderPrivilegeList = this.renderPrivilegeList.bind(this)
    this.renderPrivilegeOption = this.renderPrivilegeOption.bind(this)
    this.handleChangePrivilege = this.handleChangePrivilege.bind(this)
  }
  componentWillMount () {
    const { id } = this.props.match.params
    this.props.fetchUserOptions()
    this.props.fetchGroupDetail(id)
    this.props.fetchPrivilege()
  }
  handleChangeUsers (e, data) {
    const { id, updateGroupUsers } = this.props
    const userIds = data.value

    updateGroupUsers({ id, userIds })
  }
  dismissError () {
    this.props.dismissError()
  }
  handleChangePrivilege (p, type) {
    const { id, updateGroupPrivilege, fetchGroupDetail } = this.props
    return function (e) {
      updateGroupPrivilege({
        id,
        name: p.name,
        type
      }).then(response => {
        fetchGroupDetail(id)
      })
    }
  }
  // group privileges by menu
  formatPrivileges (privileges) {
    return privileges.reduce((acc, p) => {
      if (acc[p.menu]) {
        acc[p.menu].push(p)
      } else {
        acc[p.menu] = [p]
      }

      return acc
    }, {})
  }
  renderPrivilegeOption (p) {
    const { ownPrivileges } = this.props
    const hasPrivilege = ownPrivileges.includes(p.name)

    return (
      <div key={p.id} style={{ marginBottom: 10 }}>
        <label>
          <input
            type='checkbox'
            checked={hasPrivilege}
            // onChange={this.handleChangePrivilege(p)}
            onChange={hasPrivilege ? this.handleChangePrivilege(p, 'remove') : this.handleChangePrivilege(p, 'add')}
          />
          &nbsp;
          {p.label}
        </label>
        <br />
      </div>
    )
  }
  renderPrivilege (ps, menu) {
    return (
      <Table.Row key={menu}>
        <Table.Cell collapsing>{menu}</Table.Cell>
        <Table.Cell>{ps.map(this.renderPrivilegeOption)}</Table.Cell>
      </Table.Row>
    )
  }
  renderPrivilegeList () {
    const { privilege } = this.props
    const formatted = this.formatPrivileges(privilege.data)
    return privilege.isLoading ? (
      <Segment basic loading padded />
    ) : (
      <Table definition>
        <Table.Body>
          {mapObject(this.renderPrivilege, formatted)}
        </Table.Body>
      </Table>
    )
  }
  render () {
    const { hasPrivilege, error, isLoading, group, history, deleteGroup, userOptions } = this.props
    const deleteItem = () => {
      deleteGroup({ id: group.id })
        .then(() => {
          history.push('/group')
        })
        .catch(e => {})
    }

    if (!hasPrivilege('group-show')) {
      return (
        <Redirect to='/forbidden/detail-group' />
      )
    }
    return (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='group'
              title='Grup'
              subTitle='Detail Data Grup' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/group'>Grup</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{group.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('group-update') ? <Button as={Link} to={`/group/edit/${group.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('group-destroy') ? <DeleteModal label='group' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/group'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Message onDismiss={this.dismissError} error icon='exclamation circle' hidden={!error} header='Error' content={error} />
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{group.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>User</Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder='User'
                  fluid
                  multiple
                  search
                  icon='search'
                  selection
                  value={group.users ? group.users.map(u => u.id) : []}
                  loading={userOptions.isLoading}
                  options={userOptions.options}
                  onChange={this.handleChangeUsers}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider hidden />
        <Header>Hak Akses</Header>
        {this.renderPrivilegeList()}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    isLoading: state.group.isLoading,
    error: state.group.error,
    id: +match.params.id,
    group: state.group.detail,
    ownPrivileges: state.group.detail.privileges ? state.group.detail.privileges.map(p => p.name) : [],
    userOptions: state.options.user,
    hasPrivilege: hasPrivilege(state),
    privilege: state.privilege
  }
}

export default connect(mapStateToProps, {
  updateGroupPrivilege,
  fetchPrivilege,
  fetchUserOptions,
  deleteGroup,
  updateGroupUsers,
  dismissError,
  fetchGroupDetail
})(GroupDetail)
