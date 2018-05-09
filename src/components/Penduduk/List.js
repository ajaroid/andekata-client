import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchPenduduk, deletePenduduk } from '../../actions/penduduk'
import { Label, Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'
import HeaderTitle from '../common/HeaderTitle'
import ImportPenduduk from './ImportPenduduk'
import { path } from 'ramda'

export const StatusLabel = ({ status }) => {
  switch (status) {
    case 'active':
      return <Label color='green'>Aktif</Label>
    case 'move':
      return <Label color='yellow'>Pindah</Label>
    case 'died':
      return <Label color='red'>Meninggal</Label>
    default:
      return null
  }
}

class PendudukList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchPenduduk, page, q } = this.props

    fetchPenduduk({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchPenduduk, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchPenduduk({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deletePenduduk, fetchPenduduk } = this.props
    deletePenduduk({ id })
      .then(() => fetchPenduduk({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/penduduk/search/' + q)
    } else {
      history.push('/penduduk')
    }
  }
  renderRow (penduduk) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={penduduk.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['penduduk-update', 'penduduk-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  {hasPrivilege('penduduk-update') && <Dropdown.Item as={Link} to={`/penduduk/edit/${penduduk.id}`} icon='edit' text='Ubah' />}
                  {hasPrivilege('penduduk-destroy') && <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='penduduk' onDelete={() => this.deleteThenRefresh({ id: penduduk.id })} />}
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{penduduk.nik}</Table.Cell>
        <Table.Cell>{hasPrivilege('penduduk-show') && <Link to={`/penduduk/${penduduk.id}`}>{penduduk.name}</Link>}</Table.Cell>
        <Table.Cell>{penduduk.job && penduduk.job.name}</Table.Cell>
        <Table.Cell><StatusLabel status={penduduk.status} /></Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { user, hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('penduduk-index')) {
      return (
        <Redirect to='/forbidden/penduduk' />
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
              icon='users'
              title='Penduduk'
              subTitle='Data Penduduk Desa Saya' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Penduduk</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={12}>
            {hasPrivilege('penduduk-store') ? (
              <span>
                <Button as={Link} to='/penduduk/add' color='teal' icon='plus' content='Tambah' />
              </span>
            ) : (
              null
            )}
          </Grid.Column>
          <Grid.Column width={4} textAlign='right'>
            <SearchForm onSubmit={this.handleSearch} />
          </Grid.Column>
        </Grid>

        <Divider hidden />

        <ImportPenduduk village={path(['employee', 'village'], user)} />

        <Divider hidden />

        {
          data.length <= 0 && <Segment>
            Tidak ada data
          </Segment>
        }
        <Pagination
          prefix={q ? `/penduduk/search/${q}/page/` : `/penduduk/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>NIK</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Pekerjaan</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/penduduk/search/${q}/page/` : `/penduduk/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.penduduk,
  user: state.auth.user,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchPenduduk, deletePenduduk })(PendudukList)
