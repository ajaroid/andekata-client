import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Button, Table, Segment, Breadcrumb, Grid, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { renderSuratPengantar, deleteSuratPengantar, fetchSuratPengantarDetail } from '../../actions/suratPengantar'
// import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import { openPdf, extractKelurahan } from '../../lib/helpers'
import HeaderTitle from '../common/HeaderTitle'

class SuratPengantarDetail extends React.Component {
  constructor () {
    super()
    this.handlePrint = this.handlePrint.bind(this)
  }
  componentWillMount () {
    const { id, fetchSuratPengantarDetail } = this.props
    fetchSuratPengantarDetail(id)
  }
  handlePrint (id) {
    this.props.renderSuratPengantar({ id }).then(openPdf)
  }
  render () {
    const { hasPrivilege, suratPengantar, isLoading } = this.props
    // const deleteItem = () => {
    //   deleteSuratPengantar({ id: suratPengantar.id }).then(() => {
    //     history.push('/surat-pengantar')
    //   })
    // }

    if (!hasPrivilege('surat-pelayanan-show')) {
      return (
        <Redirect to='/forbidden/detail-surat-pengantar' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='send outline'
              title='Surat Pengantar'
              subTitle='Pembuatan Surat Pengantar' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/surat-pengantar'>Surat Pengantar</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {/* <Button as={Link} to={`/surat-pengantar/edit/${suratPengantar.id}`} color='teal' icon='pencil' content='Edit' /> */}
            {/* <DeleteModal label='surat keluar masuk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> */}
            <Button onClick={() => this.handlePrint(suratPengantar.id)} icon='print' content='Cetak' />
            &nbsp;&nbsp;<Link to='/surat-pengantar'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{extractKelurahan(suratPengantar)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Keperluan</Table.Cell>
              <Table.Cell>{suratPengantar.keperluan_surat && suratPengantar.keperluan_surat.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Pekerjaan</Table.Cell>
              <Table.Cell>{suratPengantar.job && suratPengantar.job.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Agama</Table.Cell>
              <Table.Cell>{suratPengantar.religion && suratPengantar.religion.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{suratPengantar.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>TTL</Table.Cell>
              <Table.Cell>{suratPengantar.tempat_lahir}, {suratPengantar.tanggal_lahir}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kewarganegaraan</Table.Cell>
              <Table.Cell>{suratPengantar.kewarganegaraan}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Alamat</Table.Cell>
              <Table.Cell>{suratPengantar.alamat}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RT</Table.Cell>
              <Table.Cell>{suratPengantar.rt}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>RW</Table.Cell>
              <Table.Cell>{suratPengantar.rw}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>No. KK</Table.Cell>
              <Table.Cell>{suratPengantar.no_kk}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>NIK</Table.Cell>
              <Table.Cell>{suratPengantar.nik}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tgl. Berlaku</Table.Cell>
              <Table.Cell>{suratPengantar.tgl_berlaku_dari} s/d {suratPengantar.tgl_berlaku_sampai}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Keterangan</Table.Cell>
              <Table.Cell>{suratPengantar.keterangan}</Table.Cell>
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
    isLoading: state.suratPengantar.isLoading,
    hasPrivilege: hasPrivilege(state),
    suratPengantar: state.suratPengantar.detail
  }
}

export default connect(mapStateToProps, { renderSuratPengantar, deleteSuratPengantar, fetchSuratPengantarDetail })(SuratPengantarDetail)
