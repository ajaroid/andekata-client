import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Dropdown, Table, Segment, Breadcrumb, Grid, Divider, Button, Header } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteKk, deleteKkDetail, fetchKkDetail } from '../../actions/kk'
import { DeleteModal, Loader } from 'components/common'
import { StatusLabel } from './List'

class KkDetail extends React.Component {
  constructor () {
    super()
    this.renderRow = this.renderRow.bind(this)
    this.deleteDetailThenRefresh = this.deleteDetailThenRefresh.bind(this)
  }
  componentWillMount () {
    const { id, fetchKkDetail } = this.props
    fetchKkDetail(id)
  }
  deleteDetailThenRefresh ({ id }) {
    const { deleteKkDetail, fetchKkDetail, kk } = this.props
    deleteKkDetail({ id })
      .then(() => fetchKkDetail(kk.id))
  }
  render () {
    const { hasPrivilege, kk, history, deleteKk, isLoading } = this.props
    const deleteItem = () => {
      deleteKk({ id: kk.id }).then(() => {
        history.push('/kk')
      })
    }

    if (!hasPrivilege('kk-show')) {
      return (
        <Redirect to='/forbidden/detail-kk' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Kartu Keluarga</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kk'>Kk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{kk.nama}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            <Button as={Link} to={`/kk/edit/${kk.id}`} color='teal' icon='pencil' content='Ubah' />
            <DeleteModal label='kk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} />
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/kk'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{kk.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{kk.kelurahan && kk.kelurahan.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>No KK</Table.Cell>
              <Table.Cell>{kk.no_kk}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Alamat</Table.Cell>
              <Table.Cell>{kk.alamat}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RT</Table.Cell>
              <Table.Cell>{kk.rt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RW</Table.Cell>
              <Table.Cell>{kk.rw}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kode Pos</Table.Cell>
              <Table.Cell>{kk.kode_pos}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Status</Table.Cell>
              <Table.Cell><StatusLabel status={kk.status} /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Divider hidden />
        <Header>Anggota Keluarga</Header>
        <Divider hidden />
        <Button as={Link} to={`/kk/${kk.id}/kkdetail/add`} color='teal' icon='plus' content='Tambah Anggota Keluarga' />
        <Divider hidden />
        {
          kk.kkdetail && kk.kkdetail.length <= 0 && <Segment>
            Tidak ada anggota keluarga
          </Segment>
        }
        {
          kk.kkdetail && kk.kkdetail.length >= 1 && <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>&nbsp;</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Hubungan Keluarga</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {kk.kkdetail && kk.kkdetail.map(this.renderRow)}
            </Table.Body>
          </Table>
        }
        <Divider hidden />
      </Segment>
    )
  }

  renderRow (detail) {
    const { kk } = this.props
    return (
      <Table.Row key={detail.id}>
        <Table.Cell collapsing>
          <Dropdown icon='setting' floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/kk/${kk.id}/kkdetail/edit/${detail.id}`} icon='edit' text='Ubah' />
              <DeleteModal trigger={<Dropdown.Item icon='trash' text='Hapus' />} label='anggota keluarga' onDelete={() => this.deleteDetailThenRefresh({ id: detail.id })} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell><Link to={`/penduduk/${detail.penduduk.id}`}>{detail.penduduk.nama}</Link></Table.Cell>
        <Table.Cell>{detail.shk.name}</Table.Cell>
      </Table.Row>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.kk.isLoading,
    hasPrivilege: hasPrivilege(state),
    kk: state.kk.detail
  }
}

export default connect(mapStateToProps, { deleteKk, deleteKkDetail, fetchKkDetail })(KkDetail)
