import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchKeperluanSurat, deleteKeperluanSurat } from '../../actions/keperluanSurat'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'

export const Tipe = ({ tipe }) => {
  switch (tipe) {
    case 1:
      return 'Surat Pengantar'
    case 2:
      return 'Surat Keterangan'
    default:
      return '-'
  }
}

class KeperluanSuratList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchKeperluanSurat, page, q } = this.props

    fetchKeperluanSurat({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchKeperluanSurat, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchKeperluanSurat({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteKeperluanSurat, fetchKeperluanSurat } = this.props
    deleteKeperluanSurat({ id })
      .then(() => fetchKeperluanSurat({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/keperluan-surat/search/' + q)
    } else {
      history.push('/keperluan-surat')
    }
  }
  renderRow (keperluanSurat) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={keperluanSurat.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['keperluan-surat-update', 'keperluan-surat-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/keperluan-surat/edit/${keperluanSurat.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='keperluan surat' onDelete={() => this.deleteThenRefresh({ id: keperluanSurat.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('keperluan-surat-show') ? (
              <Link to={`/keperluan-surat/${keperluanSurat.id}`}>{keperluanSurat.nama}</Link>
            ) : keperluanSurat.nama
          }
        </Table.Cell>
        <Table.Cell>{keperluanSurat.kode_pelayanan}</Table.Cell>
        <Table.Cell>{keperluanSurat.kode_surat}</Table.Cell>
        <Table.Cell><Tipe tipe={keperluanSurat.tipe} /></Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('keperluan-surat-index')) {
      return (
        <Redirect to='/forbidden/keperluan-surat' />
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
              icon='archive'
              title='Keperluan Surat'
              subTitle='Data Keperluan Surat' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Keperluan Surat</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('keperluan-surat-store') ? <Button as={Link} to='/keperluan-surat/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/keperluan-surat/search/${q}/page/` : `/keperluan-surat/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Keperluan</Table.HeaderCell>
                <Table.HeaderCell>Kode Pelayanan</Table.HeaderCell>
                <Table.HeaderCell>Kode Surat</Table.HeaderCell>
                <Table.HeaderCell>Tipe</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/keperluan-surat/search/${q}/page/` : `/keperluan-surat/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.keperluanSurat,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchKeperluanSurat, deleteKeperluanSurat })(KeperluanSuratList)
