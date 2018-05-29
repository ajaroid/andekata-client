import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchGroup, deleteGroup, dismissError } from '../../actions/group'
import { Message, Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'

class GroupList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.dismissError = this.dismissError.bind(this)
  }
  componentWillMount () {
    const { fetchGroup, page, q } = this.props

    fetchGroup({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchGroup, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchGroup({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteGroup, fetchGroup } = this.props
    deleteGroup({ id })
      .then(() => fetchGroup({ page, q }))
      .catch(e => {})
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/group/search/' + q)
    } else {
      history.push('/group')
    }
  }
  dismissError () {
    this.props.dismissError()
  }
  renderRow (group) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={group.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['group-update', 'group-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/group/edit/${group.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='group' onDelete={() => this.deleteThenRefresh({ id: group.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('group-show') ? (
              <Link to={`/group/${group.id}`}>{group.name}</Link>
            ) : group.name
          }
        </Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q, error } = this.props
    if (!hasPrivilege('group-index')) {
      return (
        <Redirect to='/forbidden/group' />
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
              icon='group'
              title='Grup'
              subTitle='Data Grup' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Group</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('group-store') ? <Button as={Link} to='/group/add' color='teal' icon='plus' content='Tambah' /> : null}
          </Grid.Column>
          <Grid.Column width={8} textAlign='right'>
            <SearchForm onSubmit={this.handleSearch} />
          </Grid.Column>
        </Grid>
        <Message onDismiss={this.dismissError} error icon='exclamation circle' hidden={!error} header='Error' content={error} />
        <Divider hidden />
        {
          data.length <= 0 && <Segment>
            Tidak ada data
          </Segment>
        }
        <Pagination
          prefix={q ? `/group/search/${q}/page/` : `/group/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/group/search/${q}/page/` : `/group/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.group,
  error: state.group.error,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchGroup, deleteGroup, dismissError })(GroupList)
