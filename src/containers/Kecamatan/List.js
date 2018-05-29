import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchKecamatan, deleteKecamatan } from '../../actions/kecamatan'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'
import { path } from 'ramda'

class KecamatanList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchKecamatan, page, q } = this.props

    fetchKecamatan({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchKecamatan, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchKecamatan({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteKecamatan, fetchKecamatan } = this.props
    deleteKecamatan({ id })
      .then(() => fetchKecamatan({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/kecamatan/search/' + q)
    } else {
      history.push('/kecamatan')
    }
  }
  renderRow (kecamatan) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={kecamatan.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['kecamatan-update', 'kecamatan-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/kecamatan/edit/${kecamatan.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='kecamatan' onDelete={() => this.deleteThenRefresh({ id: kecamatan.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{kecamatan.code}</Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('kecamatan-show') ? (
              <Link to={`/kecamatan/${kecamatan.id}`}>{kecamatan.name}</Link>
            ) : kecamatan.name
          }
        </Table.Cell>

        <Table.Cell>{path(['regency', 'name'], kecamatan)}</Table.Cell>
        <Table.Cell>{path(['regency', 'provincy', 'name'], kecamatan)}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('kecamatan-index')) {
      return (
        <Redirect to='/forbidden/kecamatan' />
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
              icon='map signs'
              title='Kecamatan'
              subTitle='Data Kecamatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Kecamatan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('kecamatan-store') ? <Button as={Link} to='/kecamatan/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/kecamatan/search/${q}/page/` : `/kecamatan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Kode</Table.HeaderCell>
                <Table.HeaderCell>Kecamatan</Table.HeaderCell>
                <Table.HeaderCell>Kabupaten / Kota</Table.HeaderCell>
                <Table.HeaderCell>Provinsi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/kecamatan/search/${q}/page/` : `/kecamatan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.kecamatan,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchKecamatan, deleteKecamatan })(KecamatanList)
