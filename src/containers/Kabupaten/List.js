import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchKabupaten, deleteKabupaten } from '../../actions/kabupaten'
import { Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'
import { path } from 'ramda'

class KabupatenList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchKabupaten, page, q } = this.props

    fetchKabupaten({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchKabupaten, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchKabupaten({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteKabupaten, fetchKabupaten } = this.props
    deleteKabupaten({ id })
      .then(() => fetchKabupaten({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/kabupaten/search/' + q)
    } else {
      history.push('/kabupaten')
    }
  }
  renderRow (kabupaten) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={kabupaten.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['kabupaten-update', 'kabupaten-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/kabupaten/edit/${kabupaten.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='kabupaten' onDelete={() => this.deleteThenRefresh({ id: kabupaten.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{kabupaten.code}</Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('kabupaten-show') ? (
              <Link to={`/kabupaten/${kabupaten.id}`}>{kabupaten.name}</Link>
            ) : kabupaten.name
          }
        </Table.Cell>
        <Table.Cell>{path(['provincy', 'name'], kabupaten)}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('kabupaten-index')) {
      return (
        <Redirect to='/forbidden/kabupaten' />
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
              icon='bus'
              title='Kabupaten'
              subTitle='Data Kabupaten' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Kabupaten</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('kabupaten-store') ? <Button as={Link} to='/kabupaten/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/kabupaten/search/${q}/page/` : `/kabupaten/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Kode</Table.HeaderCell>
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
          prefix={q ? `/kabupaten/search/${q}/page/` : `/kabupaten/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.kabupaten,
  hasPrivilege: hasPrivilege(state),
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchKabupaten, deleteKabupaten })(KabupatenList)
