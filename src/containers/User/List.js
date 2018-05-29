import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser, deleteUser } from '../../actions/user'
import { Label, Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'

export const StatusLabel = ({ status }) => {
  switch (status) {
    case 0:
      return <Label color='yellow'>Pending</Label>
    case 1:
      return <Label color='green'>Aktif</Label>
    case 2:
      return <Label color='red'>Nonaktif</Label>
    default:
      return null
  }
}

class UserList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchUser, page, q } = this.props

    fetchUser({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchUser, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchUser({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteUser, fetchUser } = this.props
    deleteUser({ id })
      .then(() => fetchUser({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/user/search/' + q)
    } else {
      history.push('/user')
    }
  }
  renderRow (user) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={user.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['user-update', 'user-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  {hasPrivilege('user-update') && <Dropdown.Item as={Link} to={`/user/edit/${user.id}`} icon='edit' text='Ubah' />}
                  {hasPrivilege('user-password-reset') && <Dropdown.Item as={Link} to={`/user/password-reset/${user.id}`} icon='key' text='Reset Password' />}
                  {hasPrivilege('user-destroy') && <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='user' onDelete={() => this.deleteThenRefresh({ id: user.id })} />}
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{hasPrivilege('user-show') && <Link to={`/user/${user.id}`}>{user.username}</Link>}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell><StatusLabel status={user.status} /></Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('user-index')) {
      return (
        <Redirect to='/forbidden/user' />
      )
    }
    return (
      <Segment basic>
        <Dimmer page inverted active={isLoading}>
          <Loader>Loading...</Loader>
        </Dimmer>

        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='user'
              title='Pengguna'
              subTitle='Data Pengguna' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Pengguna</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('user-store') && <Button as={Link} to='/user/add' color='teal' icon='plus' content='Tambah' />}
          </Grid.Column>
          <Grid.Column width={8} textAlign='right'>
            <SearchForm onSubmit={this.handleSearch} />
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {
          data.length <= 0 && <Segment>
            Tidak ada data
          </Segment>
        }
        <Pagination
          prefix={q ? `/user/search/${q}/page/` : `/user/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/user/search/${q}/page/` : `/user/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.user,
  hasPrivilege: hasPrivilege(state),
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchUser, deleteUser })(UserList)
