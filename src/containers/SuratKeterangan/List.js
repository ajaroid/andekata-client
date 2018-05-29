import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchSuratKeterangan, deleteSuratKeterangan, renderSuratKeterangan } from '../../actions/suratKeterangan'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, Pagination } from 'components/common'
// import DeleteModal from '../common/DeleteModal'
import { openPdf } from '../../lib/helpers'

class SuratKeteranganList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.hanldePrint = this.hanldePrint.bind(this)
  }
  componentWillMount () {
    const { fetchSuratKeterangan, page, q } = this.props

    fetchSuratKeterangan({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchSuratKeterangan, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchSuratKeterangan({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteSuratKeterangan, fetchSuratKeterangan } = this.props
    deleteSuratKeterangan({ id })
      .then(() => fetchSuratKeterangan({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/surat-keterangan/search/' + q)
    } else {
      history.push('/surat-keterangan')
    }
  }
  hanldePrint (id) {
    this.props.renderSuratKeterangan({ id }).then(openPdf)
  }
  renderRow (suratKeterangan) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={suratKeterangan.id}>
        {/* <Table.Cell collapsing>
          <Dropdown icon='setting' floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/surat-keterangan/edit/${suratKeterangan.id}`} icon='edit' text='Edit' />
              <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='surat keluar masuk' onDelete={() => this.deleteThenRefresh({ id: suratKeterangan.id })} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell> */}
        <Table.Cell>{hasPrivilege('surat-pelayanan-show') && <Link to={`/surat-keterangan/${suratKeterangan.id}`}>Detail</Link>}</Table.Cell>
        <Table.Cell>{hasPrivilege('surat-pelayanan-render') && <Button onClick={() => this.hanldePrint(suratKeterangan.id)} icon='print' content='Cetak' />}</Table.Cell>
        <Table.Cell>{suratKeterangan.nama}</Table.Cell>
        <Table.Cell>{suratKeterangan.tgl_berlaku_dari} s/d {suratKeterangan.tgl_berlaku_sampai}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('surat-pelayanan-index')) {
      return (
        <Redirect to='/forbidden/surat-keterangan' />
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
              icon='file text'
              title='Surat Keterangan'
              subTitle='Pembuatan Surat Keterangan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Surat Keterangan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('surat-pelayanan-store') && <Button as={Link} to='/surat-keterangan/add' color='teal' icon='plus' content='Tambah' />}
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
          prefix={q ? `/surat-keterangan/search/${q}/page/` : `/surat-keterangan/page/`}
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
                <Table.HeaderCell>Tgl. Berlaku</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/surat-keterangan/search/${q}/page/` : `/surat-keterangan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.suratKeterangan,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchSuratKeterangan, deleteSuratKeterangan, renderSuratKeterangan })(SuratKeteranganList)
