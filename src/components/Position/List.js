import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchPosition, deletePosition } from '../../actions/position'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DeleteModal from '../common/DeleteModal'
import SearchForm from '../common/SearchForm'
import HeaderTitle from '../common/HeaderTitle'

class PositionList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchPosition, page, q } = this.props

    fetchPosition({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchPosition, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchPosition({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deletePosition, fetchPosition } = this.props
    deletePosition({ id })
      .then(() => fetchPosition({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/position/search/' + q)
    } else {
      history.push('/position')
    }
  }
  renderRow (position) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={position.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['position-update', 'position-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/position/edit/${position.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='position' onDelete={() => this.deleteThenRefresh({ id: position.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('position-show') ? (
              <Link to={`/position/${position.id}`}>{position.name}</Link>
            ) : position.name
          }
        </Table.Cell>
        <Table.Cell>{position.code}</Table.Cell>
        <Table.Cell>{position.department && position.department.name}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('position-index')) {
      return (
        <Redirect to='/forbidden/position' />
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
              icon='sitemap'
              title='Jabatan'
              subTitle='Data Jabatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Jabatan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('position-store') ? <Button as={Link} to='/position/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/position/search/${q}/page/` : `/position/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Nama Jabatan</Table.HeaderCell>
                <Table.HeaderCell>Kode</Table.HeaderCell>
                <Table.HeaderCell>Departmen</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/position/search/${q}/page/` : `/position/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.position,
  page: match ? match.params.page : undefined,
  hasPrivilege: hasPrivilege(state),
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchPosition, deletePosition })(PositionList)
