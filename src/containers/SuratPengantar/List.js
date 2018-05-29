import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { fetchSuratPengantar, deleteSuratPengantar, renderSuratPengantar } from '../../actions/suratPengantar'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { SearchForm, HeaderTitle, Pagination } from 'components/common'
// import DeleteModal from '../common/DeleteModal'
import { openPdf } from '../../lib/helpers'

class SuratPengantarList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.hanldePrint = this.hanldePrint.bind(this)
  }
  componentWillMount () {
    const { fetchSuratPengantar, page, q } = this.props

    fetchSuratPengantar({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchSuratPengantar, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchSuratPengantar({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteSuratPengantar, fetchSuratPengantar } = this.props
    deleteSuratPengantar({ id })
      .then(() => fetchSuratPengantar({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/surat-pengantar/search/' + q)
    } else {
      history.push('/surat-pengantar')
    }
  }
  hanldePrint (id) {
    this.props.renderSuratPengantar({ id }).then(openPdf)
  }
  renderRow (suratPengantar) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={suratPengantar.id}>
        {/* <Table.Cell collapsing>
          <Dropdown icon='setting' floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/surat-pengantar/edit/${suratPengantar.id}`} icon='edit' text='Edit' />
              <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='surat keluar masuk' onDelete={() => this.deleteThenRefresh({ id: suratPengantar.id })} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell> */}
        <Table.Cell>{hasPrivilege('surat-pelayanan-show') && <Link to={`/surat-pengantar/${suratPengantar.id}`}>Detail</Link>}</Table.Cell>
        <Table.Cell>{hasPrivilege('surat-pelayanan-render') && <Button onClick={() => this.hanldePrint(suratPengantar.id)} icon='print' content='Cetak' />}</Table.Cell>
        <Table.Cell>{suratPengantar.nama}</Table.Cell>
        <Table.Cell>{suratPengantar.tgl_berlaku_dari} s/d {suratPengantar.tgl_berlaku_sampai}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('surat-pelayanan-index')) {
      return (
        <Redirect to='/forbidden/surat-pengantar' />
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
              icon='send outline'
              title='Surat Pengantar'
              subTitle='Pembuatan Surat Pengantar' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Surat Pengantar</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('surat-pelayanan-store') && <Button as={Link} to='/surat-pengantar/add' color='teal' icon='plus' content='Tambah' />}
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
          prefix={q ? `/surat-pengantar/search/${q}/page/` : `/surat-pengantar/page/`}
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
          prefix={q ? `/surat-pengantar/search/${q}/page/` : `/surat-pengantar/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.suratPengantar,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchSuratPengantar, deleteSuratPengantar, renderSuratPengantar })(SuratPengantarList)
