import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { fetchPendidikan, deletePendidikan } from '../../actions/pendidikan'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'
import HeaderTitle from '../common/HeaderTitle'

class PendidikanList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchPendidikan, page, q } = this.props

    fetchPendidikan({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchPendidikan, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchPendidikan({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deletePendidikan, fetchPendidikan } = this.props
    deletePendidikan({ id })
      .then(() => fetchPendidikan({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/pendidikan/search/' + q)
    } else {
      history.push('/pendidikan')
    }
  }
  renderRow (pendidikan) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={pendidikan.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['pendidikan-update', 'pendidikan-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/pendidikan/edit/${pendidikan.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='pendidikan' onDelete={() => this.deleteThenRefresh({ id: pendidikan.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('pendidikan-show') ? (
              <Link to={`/pendidikan/${pendidikan.id}`}>{pendidikan.name}</Link>
            ) : pendidikan.name
          }
        </Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('pendidikan-index')) {
      return (
        <Redirect to='/forbidden/pendidikan' />
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
              icon='student'
              title='Pendidikan'
              subTitle='Data Pendidikan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Pendidikan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('pendidikan-store') ? <Button as={Link} to='/pendidikan/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/pendidikan/search/${q}/page/` : `/pendidikan/page/`}
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
          prefix={q ? `/pendidikan/search/${q}/page/` : `/pendidikan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.pendidikan,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchPendidikan, deletePendidikan })(PendidikanList)
