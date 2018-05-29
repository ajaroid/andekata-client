import React from 'react'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { deleteSuratKeluarMasuk, fetchSuratKeluarMasukDetail } from '../../actions/suratKeluarMasuk'
// import DeleteModal from '../common/DeleteModal'
import { Loader } from 'components/common'

const jenis = j => {
  switch (j) {
    case 1:
      return 'Surat Masuk'
    case 0:
      return 'Surat Keluar'
    default:
      return '-'
  }
}

class SuratKeluarMasukDetail extends React.Component {
  componentWillMount () {
    const { id, fetchSuratKeluarMasukDetail } = this.props
    fetchSuratKeluarMasukDetail(id)
  }
  render () {
    const { suratKeluarMasuk, isLoading } = this.props
    // const deleteItem = () => {
    //   deleteSuratKeluarMasuk({ id: suratKeluarMasuk.id }).then(() => {
    //     history.push('/surat-keluar-masuk')
    //   })
    // }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Surat Keluar Masuk</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/surat-keluar-masuk'>Surat Keluar Masuk</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {/* <Button as={Link} to={`/surat-keluar-masuk/edit/${suratKeluarMasuk.id}`} color='teal' icon='pencil' content='Edit' /> */}
            {/* <DeleteModal label='surat keluar masuk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> */}
            <Link to='/surat-keluar-masuk'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Dari</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.dari}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kepada</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.kepada}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.kelurahan && suratKeluarMasuk.kelurahan.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Nomor</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.no}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Isi Surat</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.isi}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tanggal</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.tanggal}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Keterangan</Table.Cell>
              <Table.Cell>{suratKeluarMasuk.keterangan}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Jenis Surat</Table.Cell>
              <Table.Cell>{jenis(suratKeluarMasuk.jenis)}</Table.Cell>
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
    isLoading: state.suratKeluarMasuk.isLoading,
    suratKeluarMasuk: state.suratKeluarMasuk.detail
  }
}

export default connect(mapStateToProps, { deleteSuratKeluarMasuk, fetchSuratKeluarMasukDetail })(SuratKeluarMasukDetail)
