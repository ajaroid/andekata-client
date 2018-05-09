import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchAgama, deleteAgama } from '../../actions/agama'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'
import HeaderTitle from '../common/HeaderTitle'

class AgamaList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchAgama, page, q } = this.props

    fetchAgama({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchAgama, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchAgama({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteAgama, fetchAgama } = this.props
    deleteAgama({ id })
      .then(() => fetchAgama({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/agama/search/' + q)
    } else {
      history.push('/agama')
    }
  }
  renderRow (agama) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={agama.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['agama-update', 'agama-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  {hasPrivilege('agama-update') && <Dropdown.Item as={Link} to={`/agama/edit/${agama.id}`} icon='edit' text='Ubah' />}
                  {hasPrivilege('agama-destroy') && <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='agama' onDelete={() => this.deleteThenRefresh({ id: agama.id })} />}
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('agama-show') ? (
              <Link to={`/agama/${agama.id}`}>{agama.name}</Link>
            ) : agama.name
          }
        </Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('agama-index')) {
      return (
        <Redirect to='/forbidden/agama' />
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
              icon='moon'
              title='Agama'
              subTitle='Data Agama' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Agama</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('agama-store') ? <Button as={Link} to='/agama/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/agama/search/${q}/page/` : `/agama/page/`}
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
          prefix={q ? `/agama/search/${q}/page/` : `/agama/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.agama,
  hasPrivilege: hasPrivilege(state),
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchAgama, deleteAgama })(AgamaList)
