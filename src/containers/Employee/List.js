import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { fetchEmployee, deleteEmployee } from '../../actions/employee'
import { Image, Label, Breadcrumb, Segment, Dimmer, Loader, Table, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { HeaderTitle, SearchForm, DeleteModal, Pagination } from 'components/common'

export const StatusLabel = ({ status }) => {
  switch (status) {
    case 0:
      return <Label color='red'>Nonaktif</Label>
    case 1:
      return <Label color='green'>Aktif</Label>
    default:
      return null
  }
}

class EmployeeList extends React.Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.deleteThenRefresh = this.deleteThenRefresh.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    const { fetchEmployee, page, q } = this.props

    fetchEmployee({ page, q })
  }
  componentWillReceiveProps (nextProps) {
    const { fetchEmployee, page, q } = this.props
    const { page: nextPage, q: nextQ } = nextProps.match.params

    if (nextPage !== page || nextQ !== q) {
      fetchEmployee({ page: nextPage, q: nextQ })
    }
  }
  deleteThenRefresh ({ id }) {
    const { page, q, deleteEmployee, fetchEmployee } = this.props
    deleteEmployee({ id })
      .then(() => fetchEmployee({ page, q }))
  }
  handleSearch ({ q }) {
    const { history } = this.props
    if (q && q.trim()) {
      history.push('/employee/search/' + q)
    } else {
      history.push('/employee')
    }
  }
  renderRow (employee) {
    const { hasPrivilege } = this.props
    return (
      <Table.Row key={employee.id}>
        <Table.Cell collapsing>
          {
            hasPrivilege(['employee-update', 'employee-destroy']) ? (
              <Dropdown icon='setting' floating button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/employee/edit/${employee.id}`} icon='edit' text='Ubah' />
                  <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='employee' onDelete={() => this.deleteThenRefresh({ id: employee.id })} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null
          }
        </Table.Cell>
        <Table.Cell>{employee.code}</Table.Cell>
        <Table.Cell>
          {
            hasPrivilege('employee-show') ? (
              <Link to={`/employee/${employee.id}`}>{employee.name}</Link>
            ) : employee.name
          }
        </Table.Cell>
        <Table.Cell><Image size='mini' src={employee.photo} /></Table.Cell>
        <Table.Cell>{employee.address}</Table.Cell>
        <Table.Cell><StatusLabel status={employee.status} /></Table.Cell>
      </Table.Row>
    )
  }
  render () {
    const { hasPrivilege, to, current_page: currentPage, last_page: lastPage, data, isLoading, q } = this.props
    if (!hasPrivilege('employee-index')) {
      return (
        <Redirect to='/forbidden/karyawan' />
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
              icon='suitcase'
              title='Karyawan'
              subTitle='Data Karyawan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Karyawan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={8}>
            {hasPrivilege('employee-store') ? <Button as={Link} to='/employee/add' color='teal' icon='plus' content='Tambah' /> : null}
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
          prefix={q ? `/employee/search/${q}/page/` : `/employee/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
        {
          data.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Kode</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Photo</Table.HeaderCell>
                <Table.HeaderCell>Alamat</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Pagination
          prefix={q ? `/employee/search/${q}/page/` : `/employee/page/`}
          to={to}
          current_page={currentPage}
          last_page={lastPage} />
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match, location }) => ({
  ...state.employee,
  hasPrivilege: hasPrivilege(state),
  page: match ? match.params.page : undefined,
  q: match ? match.params.q : undefined
})

export default connect(mapStateToProps, { fetchEmployee, deleteEmployee })(EmployeeList)
