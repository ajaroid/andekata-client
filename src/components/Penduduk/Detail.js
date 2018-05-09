import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deletePenduduk, fetchPendudukDetail } from '../../actions/penduduk'
import DeleteModal from '../common/DeleteModal'
import { StatusLabel } from './List'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

const gender = g => {
  switch (g) {
    case 'M':
      return 'Laki-laki'
    case 'F':
      return 'Perempuan'
    default:
      return '-'
  }
}

class PendudukDetail extends React.Component {
  componentWillMount () {
    const { id, fetchPendudukDetail } = this.props
    fetchPendudukDetail(id)
  }
  render () {
    const { hasPrivilege, penduduk, history, deletePenduduk, isLoading } = this.props
    const deleteItem = () => {
      deletePenduduk({ id: penduduk.id }).then(() => {
        history.push('/penduduk')
      })
    }

    if (!hasPrivilege('penduduk-show')) {
      return (
        <Redirect to='/forbidden/detail-penduduk' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='users'
              title='Penduduk'
              subTitle='Detail Data Penduduk Desa Saya' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/penduduk'>Penduduk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{penduduk.nama}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('penduduk-update') && <Button as={Link} to={`/penduduk/edit/${penduduk.id}`} color='teal' icon='pencil' content='Edit' />}
            {hasPrivilege('penduduk-destroy') && <DeleteModal label='penduduk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} />}
            &nbsp;<Link to='/penduduk'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>NIK</Table.Cell>
              <Table.Cell>{penduduk.nik}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{penduduk.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Jenis Kelamin</Table.Cell>
              <Table.Cell>{gender(penduduk.gender)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tempat, Tanggal Lahir</Table.Cell>
              <Table.Cell>{penduduk.birth_place} , {penduduk.birth_date}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Gol. Darah</Table.Cell>
              <Table.Cell>{penduduk.blood_type}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama Ayah</Table.Cell>
              <Table.Cell>{penduduk.father_name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama Ibu</Table.Cell>
              <Table.Cell>{penduduk.mother_name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kewarganegaraan</Table.Cell>
              <Table.Cell>{penduduk.citizenship}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>No. Paspor</Table.Cell>
              <Table.Cell>{penduduk.passport_number}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>No. Kitas</Table.Cell>
              <Table.Cell>{penduduk.kitas_number}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status Kawin</Table.Cell>
              <Table.Cell>{penduduk.marital_status && penduduk.marital_status.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status Hubungan Keluarga</Table.Cell>
              <Table.Cell>{penduduk.shk && penduduk.shk.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Pekerjaan</Table.Cell>
              <Table.Cell>{penduduk.job && penduduk.job.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Pendidikan</Table.Cell>
              <Table.Cell>{penduduk.education && penduduk.education.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Agama</Table.Cell>
              <Table.Cell>{penduduk.religion && penduduk.religion.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status</Table.Cell>
              <Table.Cell><StatusLabel status={penduduk.status} /></Table.Cell>
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
    isLoading: state.penduduk.isLoading,
    hasPrivilege: hasPrivilege(state),
    penduduk: state.penduduk.detail
  }
}

export default connect(mapStateToProps, { deletePenduduk, fetchPendudukDetail })(PendudukDetail)
