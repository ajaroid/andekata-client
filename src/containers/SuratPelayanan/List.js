import React from 'react'
import { connect } from 'react-redux'
import { fetchSuratPelayanan, deleteSuratPelayanan, renderSuratPelayanan } from '../../actions/suratPelayanan'
import { Breadcrumb, Segment, Header, Dimmer, Loader, Table, Grid, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { SearchForm, Pagination } from 'components/common'
// import DeleteModal from '../common/DeleteModal'

class SuratPelayananList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleRenderSuratPelayanan = this.handleRenderSuratPelayanan.bind(this)
  }
  componentWillMount () {
    const { fetchSuratPelayanan, page, q } = this.props

    fetchSuratPelayanan({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchSuratPelayanan, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchSuratPelayanan({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteSuratPelayanan, fetchSuratPelayanan } = this.props
    deleteSuratPelayanan({ id })
      .then(() => fetchSuratPelayanan({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/surat-pelayanan/search/' + q)
    } else {
      history.push('/surat-pelayanan')
    }
  }
  handleRenderSuratPelayanan (id) {
    // TODO :
    console.log('hai id ' + id)
  }
  renderRow (suratPelayanan) {
    return (
      <Table.Row key={suratPelayanan.id}>
        {/* <Table.Cell collapsing>
          <Dropdown icon='setting' floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/surat-pelayanan/edit/${suratPelayanan.id}`} icon='edit' text='Edit' />
              <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='surat keluar masuk' onDelete={() => this.deleteThenRefresh({ id: suratPelayanan.id })} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell> */}
        <Table.Cell><Link to={`/surat-pelayanan/${suratPelayanan.id}`}>Detail</Link></Table.Cell>
        <Table.Cell><Button onClick={() => this.handleRenderSuratPelayanan(suratPelayanan.id)} icon='print' content='Cetak' /></Table.Cell>
        <Table.Cell>{suratPelayanan.nama}</Table.Cell>
        <Table.Cell>{suratPelayanan.jenis_surat ? suratPelayanan.jenis_surat.nama : '-'}</Table.Cell>
        <Table.Cell>{suratPelayanan.tgl_berlaku_dari} s/d {suratPelayanan.tgl_berlaku_sampai}</Table.Cell>
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
            <Header>Surat Pelayanan</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Surat Pelayanan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            <Button as={Link} to='/surat-pelayanan/add' color='teal' icon='plus' content='Tambah' />
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
          prefix={q ? `/surat-pelayanan/search/${q}/page/` : `/surat-pelayanan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell> */}
                <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Jenis Surat</Table.HeaderCell>
                <Table.HeaderCell>Tgl. Berlaku</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/surat-pelayanan/search/${q}/page/` : `/surat-pelayanan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.suratPelayanan,
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchSuratPelayanan, deleteSuratPelayanan, renderSuratPelayanan })(SuratPelayananList)
