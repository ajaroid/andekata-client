import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchKk, deleteKk } from '../../actions/kk'
import { Label, Header, Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'

export const StatusLabel = ({ status }) => {
  switch (status) {
    case 0:
      return <Label color='red'>Nonaktif</Label>
    case 1:
      return <Label color='green'>Aktif</Label>
    default:
      return null
  }
}

class KkList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchKk, page, q } = this.props

    fetchKk({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchKk, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchKk({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteKk, fetchKk } = this.props
    deleteKk({ id })
      .then(() => fetchKk({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/kk/search/' + q)
    } else {
      history.push('/kk')
    }
  }
  renderRow (kk) {
    return (
      <Table.Row key={kk.id}>
        <Table.Cell collapsing>
          <Dropdown icon='setting' floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/kk/edit/${kk.id}`} icon='edit' text='Ubah' />
              <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='kk' onDelete={() => this.deleteThenRefresh({ id: kk.id })} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell><Link to={`/kk/${kk.id}`}>{kk.nama}</Link></Table.Cell>
        <Table.Cell>{kk.no_kk}</Table.Cell>
        <Table.Cell>{kk.alamat}</Table.Cell>
        <Table.Cell><StatusLabel status={kk.status} /></Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('kk-index')) {
      return (
        <Redirect to='/forbidden/kk' />
      )
    }
    return (
      <Segment basic>
        <Dimmer page inverted active={isLoading}>
          <Loader>Loading...</Loader>
        </Dimmer>

        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Kartu Keluarga</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Kk</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            <Button as={Link} to='/kk/add' color='teal' icon='plus' content='Tambah' />
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
          prefix={q ? `/kk/search/${q}/page/` : `/kk/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Nomor KK</Table.HeaderCell>
                <Table.HeaderCell>Alamat</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/kk/search/${q}/page/` : `/kk/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.kk,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchKk, deleteKk })(KkList)
