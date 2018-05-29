import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchDesa, deleteDesa } from '../../actions/desa'
import { Image, Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'

class DesaList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchDesa, page, q } = this.props

    fetchDesa({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchDesa, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchDesa({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteDesa, fetchDesa } = this.props
    deleteDesa({ id })
      .then(() => fetchDesa({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/desa/search/' + q)
    } else {
      history.push('/desa')
    }
  }
  renderRow (desa) {
    return (
      <Table.Row key={desa.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['identitas-desa-update', 'identitas-desa-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  {hasPrivilege('identitas-desa-update') && <Dropdown.Item as={Link} to={`/desa/edit/${desa.id}`} icon='edit' text='Ubah' />}
                  {hasPrivilege('identitas-desa-destroy') && <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='desa' onDelete={() => this.deleteThenRefresh({ id: desa.id })} />}
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{hasPrivilege('identitas-desa-show') && <Link to={`/desa/${desa.id}`}>{desa.village.name}</Link>}</Table.Cell>
        <Table.Cell><Image size='mini' src={desa.logo} /></Table.Cell>
        <Table.Cell>{desa.headman_name}</Table.Cell>
        <Table.Cell>{desa.address}</Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('identitas-desa-index')) {
      return (
        <Redirect to='/forbidden/identitas-desa' />
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
              icon='info circle'
              title='Identitas Desa'
              subTitle='Data Identitas Desa' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Identitas Desa</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            <Button as={Link} to='/desa/add' color='teal' icon='plus' content='Tambah' />
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
          prefix={q ? `/desa/search/${q}/page/` : `/desa/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Logo</Table.HeaderCell>
                <Table.HeaderCell>Kepala Desa</Table.HeaderCell>
                <Table.HeaderCell>Alamat</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/desa/search/${q}/page/` : `/desa/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.desa,
  hasPrivilege: hasPrivilege(state),
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchDesa, deleteDesa })(DesaList)
