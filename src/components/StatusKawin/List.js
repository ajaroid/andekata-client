import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchStatusKawin, deleteStatusKawin } from '../../actions/statusKawin'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'
import HeaderTitle from '../common/HeaderTitle'

class StatusKawinList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchStatusKawin, page, q } = this.props

    fetchStatusKawin({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchStatusKawin, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchStatusKawin({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteStatusKawin, fetchStatusKawin } = this.props
    deleteStatusKawin({ id })
      .then(() => fetchStatusKawin({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/status-kawin/search/' + q)
    } else {
      history.push('/status-kawin')
    }
  }
  renderRow (statusKawin) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={statusKawin.id}>
        <Table.Cell collapsing>
          {
          hasPrivilege(['status-kawin-update', 'status-kawin-destroy']) ? (
            <Dropdown icon='setting' floating button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/status-kawin/edit/${statusKawin.id}`} icon='edit' text='Ubah' />
                <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='status kawin' onDelete={() => this.deleteThenRefresh({ id: statusKawin.id })} />
              </Dropdown.Menu>
            </Dropdown>
          ) : null
        }
        </Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('status-kawin-show') ? (
              <Link to={`/status-kawin/${statusKawin.id}`}>{statusKawin.name}</Link>
            ) : statusKawin.name
          }
        </Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('status-kawin-index')) {
      return (
        <Redirect to='/forbidden/status-kawin' />
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
              icon='check circle'
              title='Status Kawin'
              subTitle='Data Status Kawin' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Status Kawin</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('status-kawin-store') ? <Button as={Link} to='/status-kawin/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/status-kawin/search/${q}/page/` : `/status-kawin/page/`}
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
          prefix={q ? `/status-kawin/search/${q}/page/` : `/status-kawin/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.statusKawin,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchStatusKawin, deleteStatusKawin })(StatusKawinList)
