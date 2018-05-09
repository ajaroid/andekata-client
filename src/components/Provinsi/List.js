import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { fetchProvinsi, deleteProvinsi } from '../../actions/provinsi'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'
import HeaderTitle from '../common/HeaderTitle'

class ProvinsiList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchProvinsi, page, q } = this.props

    fetchProvinsi({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchProvinsi, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchProvinsi({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteProvinsi, fetchProvinsi } = this.props
    deleteProvinsi({ id })
      .then(() => fetchProvinsi({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/provinsi/search/' + q)
    } else {
      history.push('/provinsi')
    }
  }
  renderRow (provinsi) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={provinsi.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['provinsi-update', 'provinsi-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/provinsi/edit/${provinsi.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='provinsi' onDelete={() => this.deleteThenRefresh({ id: provinsi.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{provinsi.code}</Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('provinsi-show') ? (
              <Link to={`/provinsi/${provinsi.id}`}>{provinsi.name}</Link>
            ) : provinsi.name
          }
        </Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('provinsi-index')) {
      return (
        <Redirect to='/forbidden/provinsi' />
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
              icon='marker'
              title='Provinsi'
              subTitle='Data Provinsi' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Provinsi</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('provinsi-store') ? <Button as={Link} to='/provinsi/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/provinsi/search/${q}/page/` : `/provinsi/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Kode</Table.HeaderCell>
                <Table.HeaderCell>Provinsi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/provinsi/search/${q}/page/` : `/provinsi/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.provinsi,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchProvinsi, deleteProvinsi })(ProvinsiList)
