import React from 'react'
import { connect } from 'react-redux'
import { fetchSuratKeluarMasuk, deleteSuratKeluarMasuk } from '../../actions/suratKeluarMasuk'
import { Breadcrumb, Segment, Header, Dimmer, Loader, Table, Grid, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { SearchForm, Pagination } from 'components/common'
// import DeleteModal from '../common/DeleteModal'

class SuratKeluarMasukList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchSuratKeluarMasuk, page, q } = this.props

    fetchSuratKeluarMasuk({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchSuratKeluarMasuk, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchSuratKeluarMasuk({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteSuratKeluarMasuk, fetchSuratKeluarMasuk } = this.props
    deleteSuratKeluarMasuk({ id })
      .then(() => fetchSuratKeluarMasuk({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/surat-keluar-masuk/search/' + q)
    } else {
      history.push('/surat-keluar-masuk')
    }
  }
  renderRow (suratKeluarMasuk) {
    return (
      <Table.Row key={suratKeluarMasuk.id}>
        {/* <Table.Cell collapsing>
          <Dropdown icon='setting' floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/surat-keluar-masuk/edit/${suratKeluarMasuk.id}`} icon='edit' text='Edit' />
              <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='surat keluar masuk' onDelete={() => this.deleteThenRefresh({ id: suratKeluarMasuk.id })} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell> */}
        <Table.Cell><Link to={`/surat-keluar-masuk/${suratKeluarMasuk.id}`}>Detail</Link></Table.Cell>
        <Table.Cell />
        <Table.Cell>{suratKeluarMasuk.dari}</Table.Cell>
        <Table.Cell>{suratKeluarMasuk.kepada}</Table.Cell>
        <Table.Cell>{suratKeluarMasuk.tanggal}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    return (
      <Segment basic>
        <Dimmer page inverted active={isLoading}>
          <Loader>Loading...</Loader>
        </Dimmer>

        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Surat Keluar Masuk</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Surat Keluar Masuk</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            <Button as={Link} to='/surat-keluar-masuk/add' color='teal' icon='plus' content='Tambah' />
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
          prefix={q ? `/surat-keluar-masuk/search/${q}/page/` : `/surat-keluar-masuk/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell> */}
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Dari</Table.HeaderCell>
                <Table.HeaderCell>Kepada</Table.HeaderCell>
                <Table.HeaderCell>Tanggal</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/surat-keluar-masuk/search/${q}/page/` : `/surat-keluar-masuk/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.suratKeluarMasuk,
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchSuratKeluarMasuk, deleteSuratKeluarMasuk })(SuratKeluarMasukList)
