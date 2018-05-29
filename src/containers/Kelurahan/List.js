import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { fetchKelurahan, deleteKelurahan } from '../../actions/kelurahan'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'
import { path } from 'ramda'

class KelurahanList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchKelurahan, page, q } = this.props

    fetchKelurahan({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchKelurahan, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchKelurahan({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteKelurahan, fetchKelurahan } = this.props
    deleteKelurahan({ id })
      .then(() => fetchKelurahan({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/kelurahan/search/' + q)
    } else {
      history.push('/kelurahan')
    }
  }
  renderRow (kelurahan) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={kelurahan.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['kelurahan-update', 'kelurahan-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/kelurahan/edit/${kelurahan.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='kelurahan' onDelete={() => this.deleteThenRefresh({ id: kelurahan.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{kelurahan.code}</Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('kelurahan-show') ? (
              <Link to={`/kelurahan/${kelurahan.id}`}>{kelurahan.name}</Link>
            ) : kelurahan.name
          }
        </Table.Cell>
        <Table.Cell>{path(['subdistrict', 'name'], kelurahan)}</Table.Cell>
        <Table.Cell>{path(['subdistrict', 'regency', 'name'], kelurahan)}</Table.Cell>
        <Table.Cell>{path(['subdistrict', 'regency', 'provincy', 'name'], kelurahan)}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('kelurahan-index')) {
      return (
        <Redirect to='/forbidden/kelurahan' />
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
              icon='tree'
              title='Kelurahan'
              subTitle='Data Kelurahan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Kelurahan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('kelurahan-store') ? <Button as={Link} to='/kelurahan/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/kelurahan/search/${q}/page/` : `/kelurahan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Kode</Table.HeaderCell>
                <Table.HeaderCell>Kelurahan</Table.HeaderCell>
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
          prefix={q ? `/kelurahan/search/${q}/page/` : `/kelurahan/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.kelurahan,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchKelurahan, deleteKelurahan })(KelurahanList)
