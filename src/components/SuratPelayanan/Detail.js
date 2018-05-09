import React from 'react'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { deleteSuratPelayanan, fetchSuratPelayananDetail } from '../../actions/suratPelayanan'
// import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'

class SuratPelayananDetail extends React.Component {
  componentWillMount () {
    const { id, fetchSuratPelayananDetail } = this.props
    fetchSuratPelayananDetail(id)
  }
  render () {
    const { suratPelayanan, isLoading } = this.props
    // const deleteItem = () => {
    //   deleteSuratPelayanan({ id: suratPelayanan.id }).then(() => {
    //     history.push('/surat-pelayanan')
    //   })
    // }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Surat Pelayanan</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/surat-pelayanan'>Surat Pelayanan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {/* <Button as={Link} to={`/surat-pelayanan/edit/${suratPelayanan.id}`} color='teal' icon='pencil' content='Edit' /> */}
            {/* <DeleteModal label='surat keluar masuk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> */}
            <Link to='/surat-pelayanan'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{suratPelayanan.kelurahan_id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Jenis Surat</Table.Cell>
              <Table.Cell>{suratPelayanan.jenis_surat_id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Pekerjaan</Table.Cell>
              <Table.Cell>{suratPelayanan.pekerjaan_id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{suratPelayanan.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>TTL</Table.Cell>
              <Table.Cell>{suratPelayanan.tempat_lahir} , {suratPelayanan.tanggal_lahir}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kewarganegaraan</Table.Cell>
              <Table.Cell>{suratPelayanan.kewarganegaraan}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Alamat</Table.Cell>
              <Table.Cell>{suratPelayanan.alamat}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RT</Table.Cell>
              <Table.Cell>{suratPelayanan.rt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RW</Table.Cell>
              <Table.Cell>{suratPelayanan.rw}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nomor KK</Table.Cell>
              <Table.Cell>{suratPelayanan.no_kk}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>NIK</Table.Cell>
              <Table.Cell>{suratPelayanan.nik}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>keperluan</Table.Cell>
              <Table.Cell>{suratPelayanan.keperluan}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tgl. Berlaku</Table.Cell>
              <Table.Cell>{suratPelayanan.tgl_berlaku_dari} s/d {suratPelayanan.tgl_berlaku_sampai}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Keterangan</Table.Cell>
              <Table.Cell>{suratPelayanan.keterangan} s/d {suratPelayanan.tgl_berlaku_sampai}</Table.Cell>
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
    isLoading: state.suratPelayanan.isLoading,
    suratPelayanan: state.suratPelayanan.detail
  }
}

export default connect(mapStateToProps, { deleteSuratPelayanan, fetchSuratPelayananDetail })(SuratPelayananDetail)
