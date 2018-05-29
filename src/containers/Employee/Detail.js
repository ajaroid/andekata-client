import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Image, Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteEmployee, fetchEmployeeDetail } from '../../actions/employee'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'
import { StatusLabel } from './List'
import { extractKelurahan } from '../../lib/helpers'

const gender = g => {
  switch (g) {
    case 'L':
      return 'Laki-laki'
    case 'P':
      return 'Perempuan'
    default:
      return '-'
  }
}

class EmployeeDetail extends React.Component {
  componentWillMount () {
    const { id, fetchEmployeeDetail } = this.props
    fetchEmployeeDetail(id)
  }
  render () {
    const { hasPrivilege, employee, history, deleteEmployee, isLoading } = this.props
    const deleteItem = () => {
      deleteEmployee({ id: employee.id }).then(() => {
        history.push('/employee')
      })
    }

    if (!hasPrivilege('employee-show')) {
      return (
        <Redirect to='/forbidden/detail-karyawan' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='suitcase'
              title='Karyawan'
              subTitle='Detail Data Karyawan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/employee'>Karyawan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{employee.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('employee-update') ? <Button as={Link} to={`/employee/edit/${employee.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('employee-destroy') ? <DeleteModal label='employee' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            <Link to='/employee'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{extractKelurahan(employee)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{employee.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{employee.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kota</Table.Cell>
              <Table.Cell>{employee.city}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Alamat</Table.Cell>
              <Table.Cell>{employee.address}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tempat, Tanggal Lahir</Table.Cell>
              <Table.Cell>{employee.birth_city} , {employee.birth_date}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Jenis Kelamin</Table.Cell>
              <Table.Cell>{gender(employee.gender)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status Kawin</Table.Cell>
              <Table.Cell>{employee.marital_status && employee.marital_status.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status Kerja</Table.Cell>
              <Table.Cell>{employee.job_status === 0 ? 'Kontrak' : 'Tetap'}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nomor Telepon</Table.Cell>
              <Table.Cell>{employee.phone_number}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Email</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Jabatan</Table.Cell>
              <Table.Cell>{employee.position && employee.position.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status</Table.Cell>
              <Table.Cell><StatusLabel status={employee.status} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Foto</Table.Cell>
              <Table.Cell>
                <a href={employee.photo} target='_blank'>
                  <Image size='small' src={employee.photo} />
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.employee.isLoading,
    employee: state.employee.detail
  }
}

export default connect(mapStateToProps, { deleteEmployee, fetchEmployeeDetail })(EmployeeDetail)
