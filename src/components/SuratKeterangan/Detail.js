import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Button, Table, Segment, Breadcrumb, Grid, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { renderSuratKeterangan, deleteSuratKeterangan, fetchSuratKeteranganDetail } from '../../actions/suratKeterangan'
// import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import { openPdf, extractKelurahan } from '../../lib/helpers'
import HeaderTitle from '../common/HeaderTitle'

class SuratKeteranganDetail extends React.Component {
  constructor () {
    super()
    this.handlePrint = this.handlePrint.bind(this)
  }
  componentWillMount () {
    const { id, fetchSuratKeteranganDetail } = this.props
    fetchSuratKeteranganDetail(id)
  }
  handlePrint (id) {
    this.props.renderSuratKeterangan({ id }).then(openPdf)
  }
  render () {
    const { hasPrivilege, suratKeterangan, isLoading } = this.props
    // const deleteItem = () => {
    //   deleteSuratKeterangan({ id: suratKeterangan.id }).then(() => {
    //     history.push('/surat-keterangan')
    //   })
    // }

    if (!hasPrivilege('surat-pelayanan-show')) {
      return (
        <Redirect to='/forbidden/detail-surat-keterangan' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='file text'
              title='Surat Keterangan'
              subTitle='Pembuatan Surat Keterangan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/surat-keterangan'>Surat Keterangan</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {/* <Button as={Link} to={`/surat-keterangan/edit/${suratKeterangan.id}`} color='teal' icon='pencil' content='Edit' /> */}
            {/* <DeleteModal label='surat keluar masuk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> */}
            <Button onClick={() => this.handlePrint(suratKeterangan.id)} icon='print' content='Cetak' />
            &nbsp;&nbsp;<Link to='/surat-keterangan'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{extractKelurahan(suratKeterangan)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Keperluan</Table.Cell>
              <Table.Cell>{suratKeterangan.keperluan_surat && suratKeterangan.keperluan_surat.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Pekerjaan</Table.Cell>
              <Table.Cell>{suratKeterangan.job && suratKeterangan.job.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Agama</Table.Cell>
              <Table.Cell>{suratKeterangan.religion && suratKeterangan.religion.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{suratKeterangan.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>TTL</Table.Cell>
              <Table.Cell>{suratKeterangan.tempat_lahir}, {suratKeterangan.tanggal_lahir}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kewarganegaraan</Table.Cell>
              <Table.Cell>{suratKeterangan.kewarganegaraan}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Alamat</Table.Cell>
              <Table.Cell>{suratKeterangan.alamat}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RT</Table.Cell>
              <Table.Cell>{suratKeterangan.rt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RW</Table.Cell>
              <Table.Cell>{suratKeterangan.rw}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>No. KK</Table.Cell>
              <Table.Cell>{suratKeterangan.no_kk}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>NIK</Table.Cell>
              <Table.Cell>{suratKeterangan.nik}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tgl. Berlaku</Table.Cell>
              <Table.Cell>{suratKeterangan.tgl_berlaku_dari} s/d {suratKeterangan.tgl_berlaku_sampai}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Keterangan</Table.Cell>
              <Table.Cell>{suratKeterangan.keterangan}</Table.Cell>
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
    isLoading: state.suratKeterangan.isLoading,
    suratKeterangan: state.suratKeterangan.detail
  }
}

export default connect(mapStateToProps, { renderSuratKeterangan, deleteSuratKeterangan, fetchSuratKeteranganDetail })(SuratKeteranganDetail)
