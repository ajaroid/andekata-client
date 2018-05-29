import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteKeperluanSurat, fetchKeperluanSuratDetail } from '../../actions/keperluanSurat'
import { Tipe } from './List'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'

class KeperluanSuratDetail extends React.Component {
  componentWillMount () {
    const { id, fetchKeperluanSuratDetail } = this.props
    fetchKeperluanSuratDetail(id)
  }
  render () {
    const { hasPrivilege, keperluanSurat, history, deleteKeperluanSurat, isLoading } = this.props
    const deleteItem = () => {
      deleteKeperluanSurat({ id: keperluanSurat.id }).then(() => {
        history.push('/keperluan-surat')
      })
    }

    if (!hasPrivilege('keperluan-surat-show')) {
      return (
        <Redirect to='/forbidden/detail-keperluan-surat' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='archive'
              title='Keperluan Surat'
              subTitle='Detail Data Keperluan Surat' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/keperluan-surat'>Keperluan Surat</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{keperluanSurat.nama}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('keperluan-surat-update') ? <Button as={Link} to={`/keperluan-surat/edit/${keperluanSurat.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('keperluan-surat-destroy') ? <DeleteModal label='keperluan surat' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/keperluan-surat'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Keperluan</Table.Cell>
              <Table.Cell>{keperluanSurat.nama}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kode Pelayanan</Table.Cell>
              <Table.Cell>{keperluanSurat.kode_pelayanan}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kode Surat</Table.Cell>
              <Table.Cell>{keperluanSurat.kode_surat}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Tipe</Table.Cell>
              <Table.Cell><Tipe tipe={keperluanSurat.tipe} /></Table.Cell>
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
    isLoading: state.keperluanSurat.isLoading,
    keperluanSurat: state.keperluanSurat.detail
  }
}

export default connect(mapStateToProps, { deleteKeperluanSurat, fetchKeperluanSuratDetail })(KeperluanSuratDetail)
